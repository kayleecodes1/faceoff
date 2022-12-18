import PlayerAvatar, { AvatarImage } from '@components/ui/PlayerAvatar';
import Checkmark from '@components/icons/Checkmark';
import QuestionMark from '@components/icons/QuestionMark';
import X from '@components/icons/X';
import { Root, Result } from './AvatarResult.styles';
import React from 'react';

export enum AvatarResultResult {
    None = 'None',
    Unknown = 'Unknown',
    Correct = 'Correct',
    Incorrect = 'Incorrect',
}

const attributes = {
    [AvatarResultResult.None]: {
        Icon: undefined,
        avatarBackground: 'default' as const,
        resultVariant: undefined,
    },
    [AvatarResultResult.Unknown]: {
        Icon: QuestionMark,
        avatarBackground: 'default' as const,
        resultVariant: 'unknown' as const,
    },
    [AvatarResultResult.Correct]: {
        Icon: Checkmark,
        avatarBackground: 'success' as const,
        resultVariant: 'correct' as const,
    },
    [AvatarResultResult.Incorrect]: {
        Icon: X,
        avatarBackground: 'error' as const,
        resultVariant: 'incorrect' as const,
    },
};

interface AvatarResultProps {
    avatar: AvatarImage;
    result: AvatarResultResult;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ avatar, result }) => {
    const { Icon, avatarBackground, resultVariant } = attributes[result];
    return (
        <Root>
            <PlayerAvatar
                background={avatarBackground}
                image={avatar}
                size={128}
            />
            {Icon && resultVariant && (
                <Result variant={resultVariant}>
                    <Icon isAnimated size={32} />
                </Result>
            )}
        </Root>
    );
};

export default AvatarResult;
