export enum AvatarImage {
    None = 'None',
    Alina = 'Alina',
    Beryl = 'Beryl',
    Betsy = 'Betsy',
    Brian = 'Brian',
    Cambria = 'Cambria',
    Celia = 'Celia',
    Jamie = 'Jamie',
    Jarrett = 'Jarrett',
    Jerry = 'Jerry',
    Katie = 'Katie',
    Kaylee = 'Kaylee',
    Kelsey = 'Kelsey',
    KerrieG = 'KerrieG',
    KerrieM = 'KerrieM',
    Ryan = 'Ryan',
    Spencer = 'Spencer',
}

export interface Prompt {
    sourceA: { image: string; identity: AvatarImage };
    sourceB: { image: string; identity: AvatarImage };
    result: {
        image: string;
    };
}

export enum SubmissionState {
    Pending = 'Pending',
    Submitted = 'Submitted',
    Unknown = 'Unknown',
    Success = 'Success',
    Error = 'Error',
}

export enum SubmissionResult {
    None = 'None',
    Unknown = 'Unknown',
    Correct = 'Correct',
    Incorrect = 'Incorrect',
}

export enum GamePhase {
    Lobby = 'Lobby',
    Prompt = 'Prompt',
    Submission = 'Submission',
    Results = 'Results',
    End = 'End',
}
