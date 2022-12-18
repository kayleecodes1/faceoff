import { createContext } from 'react';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import { SubmissionState } from '@components/ui/SubmissionStatus';

interface GameStateContextValue {
    players: {
        avatarImage: AvatarImage;
        id: string;
        name: string;
        points?: number;
        submissionState: SubmissionState[];
    }[];
}

const GameStateContext = createContext<GameStateContextValue | null>(null);

export default GameStateContext;
