import { DataConnection, Peer } from 'peerjs';
import { ClientMessageType, ClientMessage } from '@store/client/Client.types';
import { AvatarImage, GamePhase, SubmissionResult, SubmissionState } from '@store/common/common.types';
import fetchPrompts from '@utilities/fetchPrompts';
import selectRandomSubset from '@utilities/selectRandomSubset';
import wait from '@utilities/wait';
import { HostMessage, HostMessageType } from './Host.types';
import HostGameState from './HostGameState';

const NUM_PROMPTS = 20;
const TIMER_DURATION_MS = 30 * 1000;
const MAX_POINTS_PER_ANSWER = 5;

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
        const gameState = new HostGameState(joinCode);

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
        // TODO store prompts

        // Fetch and store prompts.
        const prompts = await fetchPrompts();
        const gamePrompts = selectRandomSubset(prompts, NUM_PROMPTS);

        for (let i = 0; i < gamePrompts.length; i++) {
            //-------------------------------------------------------------------
            // Prompt
            //-------------------------------------------------------------------
            this._gameState.setPrompt(gamePrompts[i]);
            this._setGamePhase(GamePhase.Prompt);
            await wait(1000);
            this._gameState.showPromptResult();
            await wait(2000);

            //-------------------------------------------------------------------
            // Submission
            //-------------------------------------------------------------------
            this._setGamePhase(GamePhase.Submission);
            this._gameState.clearSubmissions();
            this._gameState.updateSubmissionStates([SubmissionState.Pending]);

            const startTime = Date.now();
            const endTime = startTime + TIMER_DURATION_MS;
            this._gameState.setTimer(startTime, endTime);
            await Promise.any([
                wait(TIMER_DURATION_MS),
                new Promise<void>((resolve) => {
                    this._resolveSubmissions = resolve;
                }),
            ]);
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
            await wait(2000);
            const sourceA = this._gameState.promptState?.prompt.sourceA.identity;
            for (const player of this._gameState.players) {
                console.log(player.submission);
                if (player.submission) {
                    // Update submission state.
                    const submissionState = player.submission.answers.map((s) =>
                        s === sourceA ? SubmissionState.Success : SubmissionState.Unknown,
                    );
                    this._gameState.updateSubmissionState(player.id, submissionState);
                    // Send submission result to player.
                    const results = player.submission.answers.map((s) =>
                        s === sourceA ? SubmissionResult.Correct : SubmissionResult.Unknown,
                    ) as [SubmissionResult, SubmissionResult];
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: { results },
                    });
                    await wait(250); // TODO: test this domino pause
                }
            }
            await wait(2000);

            this._gameState.showPromptSourceB();
            await wait(2000);
            const sourceB = this._gameState.promptState?.prompt.sourceB.identity;
            for (const player of this._gameState.players) {
                if (player.submission) {
                    // Update submission state.
                    const submissionState = player.submission.answers.map((s) =>
                        s === sourceA || s === sourceB ? SubmissionState.Success : SubmissionState.Error,
                    );
                    this._gameState.updateSubmissionState(player.id, submissionState);
                    // Send submission result to player.
                    const results = player.submission.answers.map((s) =>
                        s === sourceA || s === sourceB ? SubmissionResult.Correct : SubmissionResult.Incorrect,
                    ) as [SubmissionResult, SubmissionResult];
                    this._sendMessage(player.id, {
                        type: HostMessageType.UpdateSubmissionResult,
                        data: { results },
                    });
                    await wait(250); // TODO: test this domino pause
                }
            }
            await wait(2000);

            // Award points.
            for (const player of this._gameState.players) {
                // TODO variable points
                let points = 0;
                if (sourceA && player.submission?.answers.includes(sourceA)) {
                    points += calculatePoints(player.submission.t);
                }
                if (sourceB && player.submission?.answers.includes(sourceB)) {
                    points += calculatePoints(player.submission.t);
                }
                this._gameState.awardPoints(player.id, points);
                await wait(250); // TODO: test this domino pause
            }
            await wait(2000);

            this._gameState.clearSubmissionStates();
            this._gameState.sortPlayers();
        }

        //-------------------------------------------------------------------
        // End
        //-------------------------------------------------------------------
        this._setGamePhase(GamePhase.End);
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
                // TODO PLAYER SHOULD GENERATE AND SEND THEIR OWN ID SO THEY CAN RECONNECT WITH IT
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
        //if (playerId)
        // TODO allowed to join with existing name if player id matches and that player is disconnected

        // TODO if game in progress, JoinError

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
            this._sendMessage(playerId, {
                type: HostMessageType.JoinSuccess,
                data: {
                    disabledAvatars: Array.from(this._gameState.disabledAvatars),
                },
            });
        }
    }

    private _handleLeave(playerId: string) {
        this._gameState.removePlayer(playerId);
    }

    private _handleDisconnect(playerId: string) {
        // TODO
        // if game started
        // this._gameState.updatePlayer(playerId, { isConnected: false });
        // otherwise
        this._gameState.removePlayer(playerId);
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
        this._gameState.updateSubmissionState(playerId, [SubmissionState.Submitted, SubmissionState.Submitted]);
        if (this._gameState.players.every(({ submission }) => submission)) {
            this._resolveSubmissions?.();
        }
    }
}

export default Host;
