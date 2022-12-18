import { DataConnection, Peer } from 'peerjs';
import type { AvatarImage } from '@components/ui/PlayerAvatar';
import { ClientMessageType, ClientMessage } from '@store/client/Client.types';
import { HostMessage, HostMessageType } from './Host.types';
import HostGameState from './HostGameState';

class Host {
    private _peer: Peer;
    private _playerConnections: Map<string, DataConnection>;
    private _gameState: HostGameState;

    public get gameState() {
        return this._gameState;
    }

    constructor(
        peer: Peer,
        playerConnections: Map<string, DataConnection>,
        gameState: HostGameState,
    ) {
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
        const gameState = new HostGameState(joinCode, this);

        await new Promise<void>((resolve, reject) => {
            peer.on('open', () => resolve());
            peer.on('error', reject);
        });
        peer.off('open');
        peer.off('error');

        const host = new Host(peer, playerConnections, gameState);
        return host;
    }

    public startGame() {
        // TODO
    }

    private _sendMessage(playerId: string, message: HostMessage): void {
        const connection = this._playerConnections.get(playerId);
        if (typeof connection === 'undefined') {
            console.warn(
                `Attempted to send message to nonexistent player with ID '${playerId}'`,
            );
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
                // TODO
                // message.data.answers
                // update player.submissionState
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
                    disabledAvatars: Array.from(
                        this._gameState.disabledAvatars,
                    ),
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
                console.warn(
                    `Attempted to update name for nonexistent player with ID '${playerId}'`,
                );
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

    private _handleUpdateAvatarImage(
        playerId: string,
        avatarImage: AvatarImage,
    ) {
        const isTaken = this._gameState.disabledAvatars.has(avatarImage);
        if (isTaken) {
            const player = this._gameState.getPlayer(playerId);
            if (typeof player === 'undefined') {
                console.warn(
                    `Attempted to update avatar image for nonexistent player with ID '${playerId}'`,
                );
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
                    disabledAvatars: Array.from(
                        this._gameState.disabledAvatars,
                    ),
                },
            });
        }
    }
}

export default Host;
