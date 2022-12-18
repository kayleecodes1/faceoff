import { ComponentMeta, ComponentStory } from '@storybook/react';
import CreateLobbyForm from '@components/ui/CreateLobbyForm';

const Template: ComponentStory<typeof CreateLobbyForm> = ({
    onSubmit,
    ...args
}) => {
    const handleSubmit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit();
    };

    return <CreateLobbyForm onSubmit={handleSubmit} {...args} />;
};

const Main = Template.bind({});
export { Main as CreateLobbyForm };

export default {
    title: 'UI/CreateLobbyForm',
    component: CreateLobbyForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as ComponentMeta<typeof CreateLobbyForm>;
