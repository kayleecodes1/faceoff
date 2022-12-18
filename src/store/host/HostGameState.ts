import { makeAutoObservable } from 'mobx';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import { SubmissionState } from '@components/ui/SubmissionStatus';
import type { Prompt } from '@data/prompts';
import type Host from './Host';

interface HostPlayer {
    avatarImage: AvatarImage;
    displayOrder?: number;
    id: string;
    isConnected: boolean;
    name: string;
    points?: number;
    submissionState?: SubmissionState[];
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

export enum GamePhase {
    Lobby = 'Lobby',
    Prompt = 'Prompt',
    Submission = 'Submission',
    Results = 'Results',
    End = 'End',
}

class GameState {
    private _joinCode: string;
    private _players: Map<string, HostPlayer>;
    private _gamePhase: GamePhase;
    // TODO we should load up all of the prompts ahead of time
    // TODO timer
    private _promptState: PromptState | null;
    private _submissions: Map<string, [AvatarImage, AvatarImage]>;

    private async startGame() {
        // count down
        // store all prompts ...
        // advance phase to prompt, notify players
    }

    private async executePrompt() {
        // TODO
    }

    private async executeSubmission() {
        // set all submission status to [SubmissionState.Pending]
        // when submission received, set player submission status to [SubmissionState.Submitted]
    }

    private async executeResults() {
        // send phase to each player, with their submissions
        // set all submission results to [SubmissionState.Unknown, SubmissionState.Unknown]
        // ...
        // if all players submitted OR timer runs out, move on
        // ...
        // show sourceA
        // update submission results / points
        // send result to each player (how to connect Host?)
        // show sourceB
        // update submission results / points
        // send result to each player (how to connect Host?)
        // sort players by points
    }

    public get joinCode(): string {
        return this._joinCode;
    }

    public get players(): HostPlayer[] {
        return Array.from(this._players.values()); // TODO sort
    }

    public get disabledNames(): Set<string> {
        return new Set(
            Array.from(this._players.values()).map(({ name }) => name),
        );
    }

    public get disabledAvatars(): Set<AvatarImage> {
        return new Set(
            Array.from(this._players.values())
                .filter(({ avatarImage }) => avatarImage !== AvatarImage.None)
                .map(({ avatarImage }) => avatarImage),
        );
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
            console.warn(
                `Attempted to update non-existent player with ID '${playerId}'`,
            );
            return;
        }
        this._players.set(playerId, {
            ...player,
            ...data,
        });
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
