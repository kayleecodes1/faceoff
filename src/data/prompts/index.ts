import { AvatarImage } from '@components/ui/PlayerAvatar';

interface SourceData {
    image: string;
    identity: AvatarImage;
}

export interface Prompt {
    sourceA: SourceData;
    sourceB: SourceData;
    result: {
        image: string;
    };
}

// TODO build list of all possible identities

// TODO also, validate all prompts
