import { makeAutoObservable } from 'mobx';
import { SubmissionState } from '@components/ui/SubmissionStatus';
import { AvatarImage, GamePhase, Prompt } from '@store/common/common.types';

interface HostPlayer {
    avatarImage: AvatarImage;
    displayOrder: number;
    id: string;
    isConnected: boolean;
    name: string;
    points: number;
}

interface HostPlayerDerived {
    submission: [AvatarImage, AvatarImage] | null;
    submissionState: SubmissionState[] | null;
}

interface PromptState {
    prompt: Prompt;
    showResult: boolean;
    showSourceA: boolean;
    showSourceB: boolean;
}

interface TimerState {
    startTime: number;
    endTime: number;
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
    private _timerState: TimerState | null;
    private _submissions: Map<string, [AvatarImage, AvatarImage]>;
    private _submissionStates: Map<string, SubmissionState[]>;

    public get joinCode(): string {
        return this._joinCode;
    }

    public get players(): (HostPlayer & HostPlayerDerived)[] {
        return Array.from(this._players.values())
            .map((player) => ({
                ...player,
                submission: this._submissions.get(player.id) || null,
                submissionState: this._submissionStates.get(player.id) || null,
            }))
            .sort((a, b) => b.displayOrder - a.displayOrder);
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

    public get timerState(): TimerState | null {
        return this._timerState;
    }

    public get submissions(): Map<string, [AvatarImage, AvatarImage]> {
        return this._submissions;
    }

    public get submissionStates(): Map<string, SubmissionState[]> {
        return this._submissionStates;
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
        this._timerState = null;
        this._submissions = new Map();
        this._submissionStates = new Map();
        makeAutoObservable(this);
    }

    getPlayer(playerId: string) {
        return this._players.get(playerId);
    }

    addPlayer(playerId: string, name: string) {
        // TODO play sound
        this._players.set(playerId, {
            avatarImage: AvatarImage.None,
            displayOrder: 10000,
            id: playerId,
            isConnected: true,
            name,
            points: 0,
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

    setTimer(startTime: number, endTime: number) {
        this._timerState = { startTime, endTime };
    }

    clearTimer() {
        this._timerState = null;
    }

    setSubmission(playerId: string, answers: [AvatarImage, AvatarImage]) {
        this._submissions.set(playerId, answers);
    }

    clearSubmissions() {
        this._submissions.clear();
    }

    updateSubmissionStates(submissionState: SubmissionState[]) {
        for (const player of this._players.values()) {
            this._submissionStates.set(player.id, [...submissionState]);
        }
    }

    clearSubmissionStates() {
        this._submissionStates.clear();
    }

    updateSubmissionState(playerId: string, submissionState: SubmissionState[]) {
        this._submissionStates.set(playerId, submissionState);
    }

    clearSubmissionState(playerId: string) {
        this._submissionStates.delete(playerId);
    }

    awardPoints(playerId: string, points: number) {
        const player = this._players.get(playerId);
        if (player) {
            player.points += points;
        }
    }

    sortPlayers() {
        for (const player of this._players.values()) {
            player.displayOrder = player.points;
        }
    }

    /*
    updateSubmissionStateAll() {
        //
    }
    */
}

export default GameState;
