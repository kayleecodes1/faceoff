import { ComponentMeta, ComponentStory } from '@storybook/react';
import Message from '@components/ui/Message';

const Template: ComponentStory<typeof Message> = () => (
    <Message>
        This is a message with <strong>strong text</strong>!
    </Message>
);

const Main = Template.bind({});
export { Main as Message };

export default {
    title: 'UI/Message',
    component: Message,
} as ComponentMeta<typeof Message>;
