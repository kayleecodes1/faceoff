import { makeAutoObservable } from 'mobx';
import { AvatarImage, GamePhase, SubmissionResult } from '@store/common/common.types';

interface ClientPlayer {
    avatarImage: AvatarImage;
    id: string;
    name: string;
}

class GameState {
    private _player: ClientPlayer;
    private _disabledAvatars: Set<AvatarImage>;
    private _gamePhase: GamePhase;
    private _answers: [AvatarImage, AvatarImage] | null;
    private _submissionResults: [SubmissionResult, SubmissionResult] | null;
    private _endPlacement: number | null;

    public get player(): ClientPlayer {
        return this._player;
    }

    public get disabledAvatars(): Set<AvatarImage> {
        return this._disabledAvatars;
    }

    public get gamePhase(): GamePhase {
        return this._gamePhase;
    }

    public get answers(): [AvatarImage, AvatarImage] | null {
        return this._answers;
    }

    public get submissionResults(): [SubmissionResult, SubmissionResult] | null {
        return this._submissionResults;
    }

    public get endPlacement(): number | null {
        return this._endPlacement;
    }

    constructor(id: string, name: string) {
        this._player = {
            avatarImage: AvatarImage.None,
            id,
            name,
        };
        this._disabledAvatars = new Set();
        this._gamePhase = GamePhase.Lobby; // TODO get gamephase on join
        this._answers = null;
        this._submissionResults = null;
        this._endPlacement = null;
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

    updateGamePhase(gamePhase: GamePhase) {
        this._gamePhase = gamePhase;
        // TODO clear answers or submissionResults depending on phase
    }

    updateAnswers(answers: [AvatarImage, AvatarImage] | null) {
        this._answers = answers;
    }

    updateSubmissionResults(submissionResults: [SubmissionResult, SubmissionResult] | null) {
        this._submissionResults = submissionResults;
    }

    setEndPlacement(placement: number) {
        this._endPlacement = placement;
    }
}

export default GameState;
