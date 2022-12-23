import { ComponentMeta, ComponentStory } from '@storybook/react';
import JoinLobbyForm from '@components/ui/JoinLobbyForm';

const Template: ComponentStory<typeof JoinLobbyForm> = ({ onSubmit, ...args }) => {
    const handleSubmit = async (values: { joinCode: string; name: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit(values);
    };

    return <JoinLobbyForm onSubmit={handleSubmit} {...args} />;
};

const Main = Template.bind({});
export { Main as JoinLobbyForm };

export default {
    title: 'UI/JoinLobbyForm',
    component: JoinLobbyForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as ComponentMeta<typeof JoinLobbyForm>;
