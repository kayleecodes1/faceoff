import { Peer } from 'peerjs';
import type { AvatarImage } from '@components/ui/PlayerAvatar';

interface Player {
    id: string;
    displayName: string;
    avatar: AvatarImage;
    isConnected: boolean;
}

class Lobby {
    private _isHost: boolean;
    private _isJoining: boolean;
    private _playerId: string | null;
    private _players: Player[] = [];

    constructor(isHost: true);
    constructor(isHost: false, joinCode: string, displayName: string);
    // only need current player if not the host
    constructor(isHost: boolean, joinCode?: string, displayName?: string) {
        this._isHost = isHost;
        this._isJoining = true;
        // TODO create peer or conntext
    }

    static createLobby(): Lobby {
        return new Lobby(true);
    }

    static joinLobby(joinCode: string, displayName: string): Lobby {
        return new Lobby(false, joinCode, displayName);
    }
    // isHost
}

export default Lobby;

// host
//-------

const peer = new Peer('my-peer-id');
peer.on('connection', (connection) => {
    // TODO add to player list
    connection.on('open', () => {
        console.log('open');
    });
    // TODO add to players list
    // TODO send full state
    connection.on('data', (data) => {
        console.log(data);
    });

    // TODO on player change name ...
    // TODO on player change avatar ...

    connection.on('close', () => {
        // TODO they left ...
    });
});

// player
//-------

enum PlayerMessage {
    SubmitAnswer,
}

enum HostMessage {
    PlayerJoin,
    PlayerUpdate,
    PlayerLeave,
}

const connection = peer.connect('another-peers-id');
connection.on('open', () => {
    // here you have connection.id
    connection.send('hi!');
});

connection.on('data', (data) => {
    console.log(data);
});
