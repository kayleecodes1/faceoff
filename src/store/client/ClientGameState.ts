import { makeAutoObservable } from 'mobx';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import type { SubmissionState } from '@components/ui/SubmissionStatus';
import type { Prompt } from '@data/prompts';

interface ClientPlayer {
    avatarImage: AvatarImage;
    id: string;
    name: string;
}

class GameState {
    private _player: ClientPlayer;
    private _disabledAvatars: Set<AvatarImage>;

    public get player(): ClientPlayer {
        return this._player;
    }

    public get disabledAvatars(): Set<AvatarImage> {
        return this._disabledAvatars;
    }

    constructor(id: string, name: string) {
        this._player = {
            avatarImage: AvatarImage.None,
            id,
            name,
        };
        this._disabledAvatars = new Set();
        makeAutoObservable(this);
    }

    updatePlayer(data: Partial<Omit<ClientPlayer, 'id'>>) {
        this._player = {
            ...this._player,
            ...data,
        };
    }

    updateDisabledAvatars(disabledAvatars: Iterable<AvatarImage>) {
        this._disabledAvatars = new Set(disabledAvatars);
    }
}

export default GameState;
