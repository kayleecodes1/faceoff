interface SourceData {
    image: string;
    identity: string;
}

export interface Prompt {
    sources: [SourceData, SourceData];
    result: {
        image: string;
    }
}

// TODO build list of all possible identities

// TODO also, validate all prompts
