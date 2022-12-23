import PlayerAvatar from '@components/ui/PlayerAvatar';
import Checkmark from '@components/icons/Checkmark';
import QuestionMark from '@components/icons/QuestionMark';
import X from '@components/icons/X';
import { AvatarImage, SubmissionResult } from '@store/common/common.types';
import { Root, Result } from './AvatarResult.styles';
import React from 'react';

const attributes = {
    [SubmissionResult.None]: {
        Icon: undefined,
        avatarBackground: 'default' as const,
        resultVariant: undefined,
    },
    [SubmissionResult.Unknown]: {
        Icon: QuestionMark,
        avatarBackground: 'default' as const,
        resultVariant: 'unknown' as const,
    },
    [SubmissionResult.Correct]: {
        Icon: Checkmark,
        avatarBackground: 'success' as const,
        resultVariant: 'correct' as const,
    },
    [SubmissionResult.Incorrect]: {
        Icon: X,
        avatarBackground: 'error' as const,
        resultVariant: 'incorrect' as const,
    },
};

interface AvatarResultProps {
    avatar: AvatarImage;
    result: SubmissionResult;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ avatar, result }) => {
    const { Icon, avatarBackground, resultVariant } = attributes[result];
    return (
        <Root>
            <PlayerAvatar background={avatarBackground} image={avatar} size={128} />
            {Icon && resultVariant && (
                <Result variant={resultVariant}>
                    <Icon isAnimated size={32} />
                </Result>
            )}
        </Root>
    );
};

export default AvatarResult;
