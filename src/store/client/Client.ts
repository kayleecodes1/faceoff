import { DataConnection, Peer } from 'peerjs';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import { ClientMessageType, ClientMessage } from './Client.types';
import ClientGameState from './ClientGameState';
import Host from '@store/host/Host';
import { HostMessage, HostMessageType } from '@store/host/Host.types';

class Client {
    private _peer: Peer;
    private _connection: DataConnection;
    private _gameState: ClientGameState;

    public get gameState(): ClientGameState {
        return this._gameState;
    }

    constructor(
        peer: Peer,
        connection: DataConnection,
        gameState: ClientGameState,
    ) {
        this._peer = peer;
        this._connection = connection;
        this._gameState = gameState;

        this._connection.on('data', (data) => {
            this._handleMessage(data as HostMessage);
        });

        this._connection.on('close', () => {
            //
        });
    }

    public static async create(
        joinCode: string,
        name: string,
    ): Promise<Client> {
        const peer = new Peer(); // _peer.id PROVIDE ID, so we can store it for later
        await new Promise((resolve, reject) => {
            peer.on('open', resolve);
            peer.on('error', reject);
        });
        peer.off('open');
        peer.off('error');
        console.log('peer open');

        const connectionId = Host.getConnectionId(joinCode);
        const connection = peer.connect(connectionId);
        await new Promise<void>((resolve, reject) => {
            connection.on('open', resolve);
            connection.on('error', reject);
        });
        connection.off('open');
        connection.off('error');
        console.log('connection open');

        const gameState = new ClientGameState(peer.id, name);

        console.log('y', connection);
        // Send join request and wait for response.
        await new Promise<void>((resolve, reject) => {
            connection.send({
                type: ClientMessageType.Join,
                data: { name },
            });
            connection.on('data', (message) => {
                const { type, data } = message as HostMessage;
                switch (type) {
                    case HostMessageType.JoinSuccess: {
                        gameState.updateDisabledAvatars(data.disabledAvatars);
                        resolve();
                        break;
                    }
                    case HostMessageType.JoinError: {
                        reject(data.message);
                        break;
                    }
                }
            });
        });
        connection.off('data');
        console.log('game joined');

        const client = new Client(peer, connection, gameState);
        return client;
    }

    public leave() {
        this._sendMessage({
            type: ClientMessageType.Leave,
            data: {},
        });
    }

    public updateName(name: string) {
        this._gameState.updatePlayer({ name });
        this._sendMessage({
            type: ClientMessageType.UpdateName,
            data: { name },
        });
    }

    public updateAvatarImage(avatarImage: AvatarImage) {
        this._gameState.updatePlayer({ avatarImage });
        this._sendMessage({
            type: ClientMessageType.UpdateAvatarImage,
            data: { avatarImage },
        });
    }

    private _sendMessage(message: ClientMessage): void {
        this._connection.send(message);
    }

    private _handleMessage(message: HostMessage): void {
        const { type, data } = message;
        switch (type) {
            case HostMessageType.UpdateNameError: {
                this._handleUpdateNameError(data.previousName);
                break;
            }
            case HostMessageType.UpdateAvatarError: {
                this._handleUpdateAvatarError(data.previousAvatarImage);
                break;
            }
            case HostMessageType.UpdateDisabledAvatars: {
                this._handleUpdateDisabledAvatars(data.disabledAvatars);
                break;
            }
        }
    }

    private _handleUpdateNameError(previousName: string) {
        // TODO: issue error toast
        this._gameState.updatePlayer({ name: previousName });
    }

    private _handleUpdateAvatarError(previousAvatarImage: AvatarImage) {
        // TODO: issue error toast
        this._gameState.updatePlayer({ avatarImage: previousAvatarImage });
    }

    private _handleUpdateDisabledAvatars(disabledAvatars: AvatarImage[]) {
        this._gameState.updateDisabledAvatars(disabledAvatars);
    }
}

export default Client;
