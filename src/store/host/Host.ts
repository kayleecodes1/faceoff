import { DataConnection, Peer } from 'peerjs';
import { ClientMessageType, ClientMessage } from '@store/client/Client.types';
import { AvatarImage, GamePhase, SubmissionResult, SubmissionState } from '@store/common/common.types';
import fetchPrompts from '@utilities/fetchPrompts';
import selectRandomSubset from '@utilities/selectRandomSubset';
import wait from '@utilities/wait';
import { HostMessage, HostMessageType } from './Host.types';
import HostGameState, { Winner } from './HostGameState';
import SoundManager from './SoundManager';

const NUM_PROMPTS = 2;
const TIMER_DURATION_MS = 30 * 1000;

const calculatePoints = (t: number) => {
    if (t > 0.666) {
        return 3;
    } else if (t > 0.333) {
        return 2;
    } else {
        return 1;
    }
};

class Host {
    private _peer: Peer;
    private _playerConnections: Map<string, DataConnection>;
    private _gameState: HostGameState;
    private _resolveSubmissions?: () => void;

    public get gameState() {
        return this._gameState;
    }

    constructor(peer: Peer, playerConnections: Map<string, DataConnection>, gameState: HostGameState) {
        this._peer = peer;
        this._playerConnections = playerConnections;
        this._gameState = gameState;

        this._peer.on('connection', (connection) => {
            const playerId = connection.connectionId;

            connection.on('open', () => {
                this._playerConnections.set(playerId, connection);
            });

            connection.on('data', (data) => {
                this._handleMessage(playerId, data as ClientMessage);
            });

            connection.on('close', () => {
                this._playerConnections.delete(playerId);
                this._handleDisconnect(playerId);
            });
        });
    }

    static getConnectionId(joinCode: string): string {
        return `KayleeCodes-FaceOff-${joinCode.toUpperCase()}`;
    }

    public static async create(joinCode: string): Promise<Host> {
        const connectionId = this.getConnectionId(joinCode);
        const peer = new Peer(connectionId);
        const playerConnections = new Map();
        const gameState = new HostGameState(joinCode, NUM_PROMPTS);

        // Connect to peer server.
        await new Promise<void>((resolve, reject) => {
            peer.on('open', () => resolve());
            peer.on('error', reject);
        });
        peer.removeAllListeners();

        const host = new Host(peer, playerConnections, gameState);
        return host;
    }

    public startGame() {
        this._startGame();
    }

    private async _startGame() {
        // TODO make sure this can't be run multiple times

        // LATER: count down

        // Fetch and store prompts.
        const prompts = await fetchPrompts();
        const gamePrompts = selectRandomSubset(prompts, NUM_PROMPTS);

        for (let i = 0; i < gamePrompts.length; i++) {
            this._gameState.setCurrentRound(i + 1);
            //-------------------------------------------------------------------
            // Prompt
            //-------------------------------------------------------------------
            this._gameState.setPrompt(gamePrompts[i]);
            this._setGamePhase(GamePhase.Prompt);
            await wait(1000);
            this._gameState.showPromptResult();
            // TODO wait so sound lines up better?
            SoundManager.playOneShot(SoundManager.OneShot.PromptReveal);
            await wait(2000);

            //-------------------------------------------------------------------
            // Submission
            //-------------------------------------------------------------------
            this._setGamePhase(GamePhase.Submission);
            this._gameState.clearSubmissions();
            this._gameState.updateSubmissionStates([SubmissionState.Pending]);

            // Run timer.
            const startTime = Date.now();
            const endTime = startTime + TIMER_DURATION_MS;
            this._gameState.setTimer(startTime, endTime);
            SoundManager.playOneShot(SoundManager.OneShot.TimerStart);
            const stopTimerSound = SoundManager.playLoop(SoundManager.Loop.Timer);
            // -------
            let allSubmissionsReceived = false;
            // Wait for timer or all submissions.
            await Promise.any([
                (async () => {
                    await wait(TIMER_DURATION_MS / 3);
                    if (allSubmissionsReceived) {
                        return;
                    }
                    SoundManager.playOneShot(SoundManager.OneShot.TimerWarning);
                    await wait(TIMER_DURATION_MS / 3);
                    if (allSubmissionsReceived) {
                        return;
                    }
                    SoundManager.playOneShot(SoundManager.OneShot.TimerWarning);
                    await wait(TIMER_DURATION_MS / 3);
                    if (allSubmissionsReceived) {
                        return;
                    }
                    SoundManager.playOneShot(SoundManager.OneShot.TimerDoneAlarm);
                })(),
                new Promise<void>((resolve) => {
                    this._resolveSubmissions = resolve;
                }).then(() => {
                    allSubmissionsReceived = true;
                }),
            ]);
            stopTimerSound();
            SoundManager.playOneShot(SoundManager.OneShot.TimerDone);
            delete this._resolveSubmissions;
            await wait(1000);
            this._gameState.clearTimer();
            await wait(1000);

            //-------------------------------------------------------------------
            // Results
            //-------------------------------------------------------------------
            this._setGamePhase(GamePhase.Results);
            for (const player of this._gameState.players) {
                if (player.submission) {
                    this._gameState.updateSubmissionState(player.id, [
                        SubmissionState.Unknown,
                        SubmissionState.Unknown,
                    ]);
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: {
                            results: [SubmissionResult.Unknown, SubmissionResult.Unknown],
                        },
                    });
                } else {
                    this._gameState.clearSubmissionState(player.id);
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: {
                            results: [SubmissionResult.None, SubmissionResult.None],
                        },
                    });
                }
            }

            this._gameState.showPromptSourceA();
            // TODO wait so sound lines up better?
            SoundManager.playOneShot(SoundManager.OneShot.AnswerReveal);
            await wait(2000);
            const sourceA = this._gameState.promptState?.prompt.sourceA.identity;
            for (const player of this._gameState.players) {
                if (player.submission) {
                    const isCorrect = sourceA && player.submission.answers.includes(sourceA);
                    // Update submission state.
                    const submissionState = [
                        isCorrect ? SubmissionState.Success : SubmissionState.Error,
                        SubmissionState.Unknown,
                    ];
                    this._gameState.updateSubmissionState(player.id, submissionState);
                    SoundManager.playOneShot(
                        isCorrect ? SoundManager.OneShot.ResultCorrect : SoundManager.OneShot.ResultIncorrect,
                    );
                    // Send submission result to player.
                    const results = player.submission.answers.map((s) =>
                        s === sourceA ? SubmissionResult.Correct : SubmissionResult.Unknown,
                    ) as [SubmissionResult, SubmissionResult];
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: { results },
                    });
                    // Award points.
                    await wait(300);
                    if (isCorrect) {
                        const points = calculatePoints(player.submission.t);
                        this._gameState.awardPoints(player.id, points);
                        SoundManager.playOneShot(SoundManager.OneShot.Points);
                    }
                    await wait(300);
                }
            }
            await wait(2000);

            this._gameState.showPromptSourceB();
            // TODO wait so sound lines up better?
            SoundManager.playOneShot(SoundManager.OneShot.AnswerReveal);
            await wait(2000);
            const sourceB = this._gameState.promptState?.prompt.sourceB.identity;
            for (const player of this._gameState.players) {
                if (player.submission) {
                    const isCorrectA = sourceA && player.submission.answers.includes(sourceA);
                    const isCorrectB = sourceB && player.submission.answers.includes(sourceB);
                    // Update submission state.
                    const submissionState = [
                        isCorrectA ? SubmissionState.Success : SubmissionState.Error,
                        isCorrectB ? SubmissionState.Success : SubmissionState.Error,
                    ];
                    this._gameState.updateSubmissionState(player.id, submissionState);
                    SoundManager.playOneShot(
                        isCorrectB ? SoundManager.OneShot.ResultCorrect : SoundManager.OneShot.ResultIncorrect,
                    );
                    // Send submission result to player.
                    const results = player.submission.answers.map((s) =>
                        s === sourceA || s === sourceB ? SubmissionResult.Correct : SubmissionResult.Incorrect,
                    ) as [SubmissionResult, SubmissionResult];
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: { results },
                    });
                    // Award points.
                    await wait(300);
                    if (isCorrectB) {
                        const points = calculatePoints(player.submission.t);
                        this._gameState.awardPoints(player.id, points);
                        SoundManager.playOneShot(SoundManager.OneShot.Points);
                    }
                    await wait(300);
                }
            }
            await wait(2000);

            this._gameState.clearSubmissionStates();
            this._gameState.sortPlayers();
        }

        //-------------------------------------------------------------------
        // End
        //-------------------------------------------------------------------
        this._setGamePhase(GamePhase.End);
        let lastPoints = -1;
        let lastPlacement = -1;
        const winners: Winner[] = [];
        this._gameState.players.forEach((player, index) => {
            const placement = player.points === lastPoints ? lastPlacement : index + 1;
            if (index < 3) {
                winners.push({
                    avatarImage: player.avatarImage,
                    name: player.name,
                    placement: placement as 1 | 2 | 3,
                });
            }
            // Notify player of placement.
            this._sendMessage(player.id, {
                type: HostMessageType.UpdateEndPlacement,
                data: { placement },
            });
            lastPoints = player.points;
            lastPlacement = placement;
        });
        this._gameState.setWinners(winners);
        SoundManager.playOneShot(SoundManager.OneShot.GameEnd);
    }

    private _setGamePhase(gamePhase: GamePhase) {
        this._gameState.setGamePhase(gamePhase);
        if (gamePhase === GamePhase.Results) {
            for (const { id, submission } of this._gameState.players) {
                const answers = submission?.answers || [AvatarImage.None, AvatarImage.None];
                this._sendMessage(id, {
                    type: HostMessageType.UpdateGamePhase,
                    data: { gamePhase, answers },
                });
            }
        } else {
            this._broadcastMessage({
                type: HostMessageType.UpdateGamePhase,
                data: { gamePhase },
            });
        }
    }

    private _sendMessage(playerId: string, message: HostMessage): void {
        const connection = this._playerConnections.get(playerId);
        if (typeof connection === 'undefined') {
            console.warn(`Attempted to send message to nonexistent player with ID '${playerId}'`);
            return;
        }
        connection.send(message);
    }

    private _broadcastMessage(message: HostMessage): void {
        Array.from(this._playerConnections.values()).forEach((connection) => {
            connection.send(message);
        });
    }

    private _handleMessage(playerId: string, message: ClientMessage): void {
        const { type, data } = message;
        switch (type) {
            case ClientMessageType.Join: {
                this._handleJoin(playerId, data.name);
                break;
            }
            case ClientMessageType.Leave: {
                this._handleLeave(playerId);
                break;
            }
            case ClientMessageType.UpdateName: {
                this._handleUpdateName(playerId, data.name);
                break;
            }
            case ClientMessageType.UpdateAvatarImage: {
                this._handleUpdateAvatarImage(playerId, data.avatarImage);
                break;
            }
            case ClientMessageType.SubmitAnswers: {
                this._handleSubmitAnswers(playerId, data.answers);
                break;
            }
        }
    }

    private _handleJoin(playerId: string, name: string) {
        const existingPlayer = this._gameState.players.find((player) => player.name === name && !player.isConnected);
        if (existingPlayer) {
            // TODO need to change their id
            this._gameState.updatePlayer(existingPlayer.id, { id: playerId, isConnected: true });
            SoundManager.playOneShot(SoundManager.OneShot.PlayerReconnect);
            this._sendMessage(playerId, {
                type: HostMessageType.JoinSuccess,
                data: {},
            });
            this._sendMessage(playerId, {
                type: HostMessageType.UpdateGamePhase,
                data: {
                    gamePhase: this._gameState.gamePhase,
                },
            });
        }

        if (this._gameState.gamePhase === GamePhase.Lobby) {
            const isTaken = this._gameState.disabledNames.has(name);
            if (isTaken) {
                this._sendMessage(playerId, {
                    type: HostMessageType.JoinError,
                    data: {
                        message: 'That name is already taken',
                    },
                });
            } else {
                this._gameState.addPlayer(playerId, name);
                SoundManager.playOneShot(SoundManager.OneShot.PlayerJoin);
                this._sendMessage(playerId, {
                    type: HostMessageType.JoinSuccess,
                    data: {},
                });
                this._sendMessage(playerId, {
                    type: HostMessageType.UpdateDisabledAvatars,
                    data: {
                        disabledAvatars: Array.from(this._gameState.disabledAvatars),
                    },
                });
            }
        } else {
            this._sendMessage(playerId, {
                type: HostMessageType.JoinError,
                data: {
                    message: 'Game has already started',
                },
            });
        }
    }

    private _handleLeave(playerId: string) {
        this._gameState.removePlayer(playerId);
        SoundManager.playOneShot(SoundManager.OneShot.PlayerLeave);
    }

    private _handleDisconnect(playerId: string) {
        if (this._gameState.gamePhase === GamePhase.Lobby) {
            this._handleLeave(playerId);
        } else {
            this._gameState.updatePlayer(playerId, { isConnected: false });
            SoundManager.playOneShot(SoundManager.OneShot.PlayerDisconnect);
        }
    }

    private _handleUpdateName(playerId: string, name: string) {
        const isTaken = this._gameState.disabledNames.has(name);
        if (isTaken) {
            const player = this._gameState.getPlayer(playerId);
            if (typeof player === 'undefined') {
                console.warn(`Attempted to update name for nonexistent player with ID '${playerId}'`);
                return;
            }
            this._sendMessage(playerId, {
                type: HostMessageType.UpdateNameError,
                data: {
                    previousName: player.name,
                },
            });
        } else {
            this._gameState.updatePlayer(playerId, { name });
        }
    }

    private _handleUpdateAvatarImage(playerId: string, avatarImage: AvatarImage) {
        const isTaken = this._gameState.disabledAvatars.has(avatarImage);
        if (isTaken) {
            const player = this._gameState.getPlayer(playerId);
            if (typeof player === 'undefined') {
                console.warn(`Attempted to update avatar image for nonexistent player with ID '${playerId}'`);
                return;
            }
            this._sendMessage(playerId, {
                type: HostMessageType.UpdateAvatarError,
                data: {
                    previousAvatarImage: player.avatarImage,
                },
            });
        } else {
            this._gameState.updatePlayer(playerId, { avatarImage });
            this._broadcastMessage({
                type: HostMessageType.UpdateDisabledAvatars,
                data: {
                    disabledAvatars: Array.from(this._gameState.disabledAvatars),
                },
            });
        }
    }

    private _handleSubmitAnswers(playerId: string, answers: [AvatarImage, AvatarImage]) {
        if (this._gameState.gamePhase !== GamePhase.Submission) {
            return;
        }
        if (!this._gameState.timerState) {
            return;
        }
        const { startTime, endTime } = this._gameState.timerState;
        const t = 1 - (Date.now() - startTime) / (endTime - startTime);
        this._gameState.setSubmission(playerId, answers, t);
        this._gameState.updateSubmissionState(playerId, [SubmissionState.Submitted]);
        SoundManager.playOneShot(SoundManager.OneShot.Submission);
        if (this._gameState.players.every(({ submission }) => submission)) {
            this._resolveSubmissions?.();
        }
    }
}

export default Host;
