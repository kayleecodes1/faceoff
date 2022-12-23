import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvatarResult from '@components/ui/AvatarResult';
import { AvatarImage, SubmissionResult } from '@store/common/common.types';

const Template: ComponentStory<typeof AvatarResult> = ({ ...args }) => {
    return <AvatarResult {...args} />;
};

const Main = Template.bind({});
export { Main as AvatarResult };

export default {
    title: 'UI/AvatarResult',
    component: AvatarResult,
    argTypes: {
        avatar: {
            control: 'select',
            defaultValue: AvatarImage.None,
            options: Object.values(AvatarImage),
        },
        result: {
            control: 'select',
            defaultValue: SubmissionResult.None,
            options: Object.values(SubmissionResult),
        },
    },
} as ComponentMeta<typeof AvatarResult>;
