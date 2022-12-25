import { ComponentMeta, ComponentStory } from '@storybook/react';
import WinnerDisplay from '@components/ui/WinnerDisplay';
import { AvatarImage } from '@store/common/common.types';

const Template: ComponentStory<typeof WinnerDisplay> = ({ ...args }) => {
    return <WinnerDisplay {...args} />;
};

const Main = Template.bind({});
export { Main as WinnerDisplay };

export default {
    title: 'UI/WinnerDisplay',
    component: WinnerDisplay,
    argTypes: {
        avatarImage: {
            control: 'select',
            defaultValue: AvatarImage.Kaylee,
            options: Object.values(AvatarImage),
        },
        name: {
            control: 'text',
            defaultValue: 'Player',
        },
        placement: {
            control: 'select',
            defaultValue: 1,
            options: [1, 2, 3],
        },
    },
} as ComponentMeta<typeof WinnerDisplay>;
