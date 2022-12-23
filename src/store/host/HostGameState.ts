import { makeAutoObservable } from 'mobx';
import { SubmissionState } from '@components/ui/SubmissionStatus';
import { AvatarImage, GamePhase, Prompt } from '@store/common/common.types';

interface HostPlayer {
    avatarImage: AvatarImage;
    displayOrder?: number;
    id: string;
    isConnected: boolean;
    name: string;
    points?: number;
}

interface HostPlayerDerived {
    submission: [AvatarImage, AvatarImage] | null;
    submissionState: SubmissionState[];
}

interface TimerState {
    // TODO
}

interface PromptState {
    prompt: Prompt;
    showResult: boolean;
    showSourceA: boolean;
    showSourceB: boolean;
}

class GameState {
    private _joinCode: string;
    private _players: Map<string, HostPlayer>;
    private _gamePhase: GamePhase;
    // TODO we should load up all of the prompts ahead of time
    // TODO timer
    //private _prompts: Prompt[];
    //private _currentPromptIndex: number;
    private _promptState: PromptState | null;
    private _submissions: Map<string, [AvatarImage, AvatarImage]>;

    public get joinCode(): string {
        return this._joinCode;
    }

    public get players(): (HostPlayer & HostPlayerDerived)[] {
        return Array.from(this._players.values()).map((player) => ({
            ...player,
            submission: this._submissions.get(player.id) || null,
            submissionState: this._submissionStates.get(player.id) || [],
        }));
        // TODO sort
    }

    public get disabledNames(): Set<string> {
        return new Set(Array.from(this._players.values()).map(({ name }) => name));
    }

    public get disabledAvatars(): Set<AvatarImage> {
        return new Set(
            Array.from(this._players.values())
                .filter(({ avatarImage }) => avatarImage !== AvatarImage.None)
                .map(({ avatarImage }) => avatarImage),
        );
    }

    public get gamePhase(): GamePhase {
        return this._gamePhase;
    }

    public get promptState(): PromptState | null {
        return this._promptState;
    }

    public get submissions(): Map<string, [AvatarImage, AvatarImage]> {
        return this._submissions;
    }

    private get _submissionStates(): Map<string, SubmissionState[]> {
        // if GamePhase.Submission, SubmissionState.Pending if no _submissions, else SubmissionState.Submitted
        // if GamePhase.Results, calculate SubmissionState.Unknown SubmissionState.Success SubmissionState.Error
        //      based on promptState and submissions
        // else empty

        return new Map();
    }

    /*
    // TODO timer
    private _currentPrompt: Prompt | null;
    public get currentPrompt(): Prompt | null {
        return this._currentPrompt;
    }
    */

    constructor(joinCode: string) {
        this._joinCode = joinCode;
        this._players = new Map();
        this._gamePhase = GamePhase.Lobby;
        //this._prompts = prompts;
        //this._currentPromptIndex = 0;
        this._promptState = null;
        this._submissions = new Map();
        makeAutoObservable(this);
    }

    getPlayer(playerId: string) {
        return this._players.get(playerId);
    }

    addPlayer(playerId: string, name: string) {
        // TODO play sound
        this._players.set(playerId, {
            avatarImage: AvatarImage.None,
            id: playerId,
            isConnected: true,
            name,
        });
    }

    removePlayer(playerId: string) {
        // TODO play sound
        this._players.delete(playerId);
    }

    updatePlayer(playerId: string, data: Partial<Omit<HostPlayer, 'id'>>) {
        const player = this._players.get(playerId);
        if (typeof player === 'undefined') {
            console.warn(`Attempted to update non-existent player with ID '${playerId}'`);
            return;
        }
        this._players.set(playerId, {
            ...player,
            ...data,
        });
    }

    setGamePhase(gamePhase: GamePhase) {
        this._gamePhase = gamePhase;
    }

    setPrompt(prompt: Prompt) {
        this._promptState = {
            prompt,
            showResult: false,
            showSourceA: false,
            showSourceB: false,
        };
    }

    showPromptResult() {
        if (this._promptState !== null) {
            this._promptState.showResult = true;
        }
    }

    showPromptSourceA() {
        if (this._promptState !== null) {
            this._promptState.showSourceA = true;
        }
    }

    showPromptSourceB() {
        if (this._promptState !== null) {
            this._promptState.showSourceB = true;
        }
    }

    setSubmission(playerId: string, answers: [AvatarImage, AvatarImage]) {
        this._submissions.set(playerId, answers);
    }

    clearSubmissions() {
        this._submissions.clear();
    }

    /*

    sortPlayers() {
        // update displayOrder based on points, fall back to order in map
    }

    updateSubmissionStateAll() {
        //
    }
    */
}

export default GameState;
