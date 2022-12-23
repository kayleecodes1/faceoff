import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlayerAvatar from '@components/ui/PlayerAvatar';
import { AvatarImage } from '@store/common/common.types';

const Template: ComponentStory<typeof PlayerAvatar> = (args) => <PlayerAvatar {...args} />;

const Main = Template.bind({});
export { Main as PlayerAvatar };

export default {
    title: 'UI/PlayerAvatar',
    component: PlayerAvatar,
    argTypes: {
        background: {
            control: 'select',
            options: ['default', 'highlight'],
        },
        image: {
            control: 'select',
            options: Object.values(AvatarImage),
        },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof PlayerAvatar>;
