import { DataConnection } from 'peerjs';
import { v4 as uuid } from 'uuid';

export interface PeerRequest {
    requestId: string;
    data?: any;
}

export interface PeerResponse {
    requestId: string;
    data?: any;
    error?: string;
}

class PeerApi {
    private _connection: DataConnection;
    private _pendingRequests: Map<
        string,
        [(value: unknown) => void, (reason?: any) => void]
    > = new Map();

    constructor(connection: DataConnection) {
        this._connection = connection;
        this._connection.on('data', (data: any) => {
            if (typeof data?.requestId === 'string') {
                this._handleResponse(data as PeerResponse);
            }
        });
    }

    private _handleResponse(response: PeerResponse) {
        const pendingRequest = this._pendingRequests.get(response.requestId);
        if (!pendingRequest) {
            console.warn(
                `Received response with no pending request, ID '${response.requestId}'`,
            );
            return;
        }

        const [resolve, reject] = pendingRequest;
        if (response.error) {
            reject(response.error);
        } else {
            resolve(response.data);
        }
    }

    public async request<T, K>(data: T): Promise<K> {
        const requestId = uuid();
        const request: PeerRequest = { requestId, ...data };
        const result = new Promise((resolve, reject) => {
            this._pendingRequests.set(requestId, [resolve, reject]);
        });
        this._connection.send(request);
        return (await result) as K;
    }
}

export default PeerApi;
