import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlayerCard from '@components/ui/PlayerCard';
import { AvatarImage } from '@store/common/common.types';

const Template: ComponentStory<typeof PlayerCard> = ({ ...args }) => {
    return <PlayerCard {...args} />;
};

const Main = Template.bind({});
export { Main as PlayerCard };

export default {
    title: 'UI/PlayerCard',
    component: PlayerCard,
    argTypes: {
        avatarImage: {
            control: 'select',
            options: Object.values(AvatarImage),
        },
        isConnected: {
            control: 'boolean',
        },
        name: {
            control: 'text',
            defaultValue: 'Player',
        },
        points: { control: 'number' },
    },
} as ComponentMeta<typeof PlayerCard>;
