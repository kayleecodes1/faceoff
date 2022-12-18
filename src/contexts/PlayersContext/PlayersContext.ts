import { createContext } from 'react';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import { SubmissionState } from '@components/ui/SubmissionStatus';

export interface PlayersContextValue {
    players: {
        avatarImage?: AvatarImage;
        id: string;
        name: string;
        points?: number;
        submissionState?: SubmissionState[];
    }[];
}

const PlayersContext = createContext<PlayersContextValue | null>(null);

export default PlayersContext;
