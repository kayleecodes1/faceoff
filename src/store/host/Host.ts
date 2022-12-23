import { DataConnection, Peer } from 'peerjs';
import { ClientMessageType, ClientMessage } from '@store/client/Client.types';
import { AvatarImage, GamePhase } from '@store/common/common.types';
import fetchPrompts from '@utilities/fetchPrompts';
import selectRandomSubset from '@utilities/selectRandomSubset';
import wait from '@utilities/wait';
import { HostMessage, HostMessageType } from './Host.types';
import HostGameState from './HostGameState';

const NUM_PROMPTS = 20;

class Host {
    private _peer: Peer;
    private _playerConnections: Map<string, DataConnection>;
    private _gameState: HostGameState;

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

            await wait(2000);
            this._gameState.showPromptResult();

            //await wait(6000);

            //-------------------------------------------------------------------
            // Submission
            //-------------------------------------------------------------------
            this._gameState.clearSubmissions();
            this._setGamePhase(GamePhase.Submission);
            // TODO set timer
            // TODO wait for all submissions OR timer

            await wait(8000);

            //-------------------------------------------------------------------
            // Results
            //-------------------------------------------------------------------
            this._setGamePhase(GamePhase.Results);
            // TODO
            this._gameState.showPromptSourceA();
            await wait(4000);
            for (const player of this._gameState.players) {
                // TODO send result to each player
                // TODO add points to player
            }
            await wait(4000);

            this._gameState.showPromptSourceB();
            await wait(4000);
            for (const player of this._gameState.players) {
                // TODO send result to each player
                // TODO add points to player
            }
            await wait(4000);
        }

        //-------------------------------------------------------------------
        // End
        //-------------------------------------------------------------------
        // TODO
    }

    private _setGamePhase(gamePhase: GamePhase) {
        this._gameState.setGamePhase(gamePhase);
        if (gamePhase === GamePhase.Results) {
            for (const { id, submission } of this._gameState.players) {
                const answers = submission || [AvatarImage.None, AvatarImage.None];
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

    private async executePrompt() {
        // TODO
    }

    private async executeSubmission() {
        // set all submission status to [SubmissionState.Pending]
        // when submission received, set player submission status to [SubmissionState.Submitted]
    }

    private async executeResults() {
        // send phase to each player, with their submissions
        // set all submission results to [SubmissionState.Unknown, SubmissionState.Unknown]
        // ...
        // if all players submitted OR timer runs out, move on
        // ...
        // show sourceA
        // update submission results / points
        // send result to each player (how to connect Host?)
        // show sourceB
        // update submission results / points
        // send result to each player (how to connect Host?)
        // sort players by points
    }

    // TODO make method to send message to players about game phase
    // will automatically send answers if in Results, otherwise broadcasts phase
    // can also send to individual, e.g. if they just rejoined and need phase

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
        this._gameState.setSubmission(playerId, answers);

        // TODO do something if this resulted in all submissions being submitted
    }
}

export default Host;
