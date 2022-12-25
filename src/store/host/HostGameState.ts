import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { SubmissionState } from '@components/ui/SubmissionStatus';
import { AvatarImage, GamePhase, Prompt } from '@store/common/common.types';

interface HostPlayer {
    avatarImage: AvatarImage;
    displayOrder: number;
    id: string;
    isConnected: boolean;
    name: string;
    points: number;
    stableId: string;
}

interface SubmissionData {
    answers: [AvatarImage, AvatarImage];
    t: number;
}

interface HostPlayerDerived {
    submission: SubmissionData | null;
    submissionState: SubmissionState[] | null;
}

interface RoundState {
    currentRound: number;
    totalRounds: number;
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

export interface Winner {
    avatarImage: AvatarImage;
    name: string;
    placement: 1 | 2 | 3;
}

class GameState {
    private _joinCode: string;
    private _players: HostPlayer[];
    private _gamePhase: GamePhase;
    private _roundState: RoundState;
    private _promptState: PromptState | null;
    private _timerState: TimerState | null;
    private _submissions: Map<string, SubmissionData>;
    private _submissionStates: Map<string, SubmissionState[]>;
    private _winners: Winner[];

    public get joinCode(): string {
        return this._joinCode;
    }

    public get players(): (HostPlayer & HostPlayerDerived)[] {
        return this._players
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

    public get roundState(): RoundState {
        return this._roundState;
    }

    public get promptState(): PromptState | null {
        return this._promptState;
    }

    public get timerState(): TimerState | null {
        return this._timerState;
    }

    public get submissions(): Map<string, SubmissionData> {
        return this._submissions;
    }

    public get submissionStates(): Map<string, SubmissionState[]> {
        return this._submissionStates;
    }

    public get winners(): Winner[] {
        return this._winners;
    }

    /*
    // TODO timer
    private _currentPrompt: Prompt | null;
    public get currentPrompt(): Prompt | null {
        return this._currentPrompt;
    }
    */

    constructor(joinCode: string, totalRounds: number) {
        this._joinCode = joinCode;
        this._players = [];
        this._gamePhase = GamePhase.Lobby;
        this._roundState = {
            currentRound: 1,
            totalRounds,
        };
        this._promptState = null;
        this._timerState = null;
        this._submissions = new Map();
        this._submissionStates = new Map();
        this._winners = [];
        makeAutoObservable(this);
    }

    getPlayer(playerId: string) {
        return this._players.find((player) => player.id === playerId);
    }

    addPlayer(playerId: string, name: string) {
        this._players.push({
            avatarImage: AvatarImage.None,
            displayOrder: 10000,
            id: playerId,
            isConnected: true,
            name,
            points: 0,
            stableId: uuid(),
        });
    }

    removePlayer(playerId: string) {
        const index = this._players.findIndex((player) => player.id === playerId);
        if (index !== -1) {
            this._players.splice(index, 1);
        }
    }

    updatePlayer(playerId: string, data: Partial<Omit<HostPlayer, 'stableId'>>) {
        const player = this._players.find((player) => player.id === playerId);
        if (player) {
            Object.assign(player, data);
        }
    }

    setGamePhase(gamePhase: GamePhase) {
        this._gamePhase = gamePhase;
    }

    setCurrentRound(currentRound: number) {
        this._roundState.currentRound = currentRound;
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

    setSubmission(playerId: string, answers: [AvatarImage, AvatarImage], t: number) {
        this._submissions.set(playerId, { answers, t });
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
        const player = this._players.find((player) => player.id === playerId);
        if (player) {
            player.points += points;
        }
    }

    sortPlayers() {
        for (const player of this._players.values()) {
            player.displayOrder = player.points;
        }
    }

    setWinners(winners: Winner[]) {
        this._winners = winners;
    }
}

export default GameState;
