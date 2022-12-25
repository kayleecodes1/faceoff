import { DataConnection, Peer } from 'peerjs';
import { AvatarImage, GamePhase, SubmissionResult } from '@store/common/common.types';
import Host from '@store/host/Host';
import { HostMessage, HostMessageType } from '@store/host/Host.types';
import { ClientMessageType, ClientMessage } from './Client.types';
import ClientGameState from './ClientGameState';

class Client {
    private _peer: Peer;
    private _connection: DataConnection;
    private _gameState: ClientGameState;

    public get gameState(): ClientGameState {
        return this._gameState;
    }

    constructor(peer: Peer, connection: DataConnection, gameState: ClientGameState) {
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

    public static async create(joinCode: string, name: string): Promise<Client> {
        const peer = new Peer();

        // Connect to peer server.
        await new Promise((resolve, reject) => {
            peer.on('open', resolve);
            peer.on('error', reject);
        });
        peer.removeAllListeners();

        // Connect to host.
        const connectionId = Host.getConnectionId(joinCode);
        const connection = peer.connect(connectionId);
        await new Promise<void>((resolve, reject) => {
            connection.on('open', resolve);
            connection.on('error', reject);
        });
        connection.removeAllListeners();

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
        connection.removeAllListeners();

        const gameState = new ClientGameState(peer.id, name);
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

    public submitAnswers(answers: [AvatarImage, AvatarImage]) {
        this._sendMessage({
            type: ClientMessageType.SubmitAnswers,
            data: { answers },
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
            case HostMessageType.UpdateGamePhase: {
                if (data.gamePhase === GamePhase.Results) {
                    const foo = data as { gamePhase: GamePhase.Results; answers: [AvatarImage, AvatarImage] };
                    this._handleUpdateGamePhase(data.gamePhase as GamePhase.Results, foo.answers);
                } else {
                    this._handleUpdateGamePhase(data.gamePhase as GamePhase);
                }
                break;
            }
            case HostMessageType.UpdateSubmissionResult: {
                this._handleUpdateSubmissionResult(data.results);
                break;
            }
            case HostMessageType.UpdateEndPlacement: {
                this._handleUpdateEndPlacement(data.placement);
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

    private _handleUpdateGamePhase(gamePhase: GamePhase): void;
    private _handleUpdateGamePhase(gamePhase: GamePhase.Results, answers: [AvatarImage, AvatarImage]): void;
    private _handleUpdateGamePhase(gamePhase: GamePhase, answers?: [AvatarImage, AvatarImage]) {
        this.gameState.updateGamePhase(gamePhase);
        if (answers) {
            this._gameState.updateAnswers(answers);
        }
    }

    private _handleUpdateSubmissionResult(results: [SubmissionResult, SubmissionResult]) {
        this._gameState.updateSubmissionResults(results);
    }

    private _handleUpdateEndPlacement(placement: number) {
        this._gameState.setEndPlacement(placement);
    }
}

export default Client;
