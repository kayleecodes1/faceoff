import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlayerList from '@components/features/PlayerList';
import { SubmissionState } from '@components/ui/SubmissionStatus';
import { AvatarImage } from '@store/common/common.types';

const Main: ComponentStory<typeof PlayerList> = () => {
    const value = {
        players: [
            {
                avatarImage: AvatarImage.Kaylee,
                id: '1',
                name: 'Kaylee',
                points: 6,
                submissionState: [SubmissionState.Pending],
            },
            {
                avatarImage: AvatarImage.KerrieM,
                id: '2',
                name: 'Kerrie',
                points: 4,
                submissionState: [SubmissionState.Submitted],
            },
            {
                avatarImage: AvatarImage.Katie,
                id: '3',
                name: 'Katie',
                points: 3,
                submissionState: [SubmissionState.Pending],
            },
        ],
    };
    return <PlayerList />;
};
export { Main as PlayerList };

export default {
    title: 'Features/PlayerList',
    component: PlayerList,
} as ComponentMeta<typeof PlayerList>;
