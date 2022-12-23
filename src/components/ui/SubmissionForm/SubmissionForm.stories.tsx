import { ComponentMeta, ComponentStory } from '@storybook/react';
import SubmissionForm from '@components/ui/SubmissionForm';
import { AvatarImage } from '@store/common/common.types';

const Template: ComponentStory<typeof SubmissionForm> = ({ onSubmit, ...args }) => {
    const handleSubmit = async (values: { answers: [AvatarImage, AvatarImage] }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit(values);
    };

    return <SubmissionForm onSubmit={handleSubmit} {...args} />;
};

const Main = Template.bind({});
export { Main as SubmissionForm };

export default {
    title: 'UI/SubmissionForm',
    component: SubmissionForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as ComponentMeta<typeof SubmissionForm>;
