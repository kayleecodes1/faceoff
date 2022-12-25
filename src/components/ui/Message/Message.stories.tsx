import { ComponentMeta, ComponentStory } from '@storybook/react';
import Message from '@components/ui/Message';

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

const Main = Template.bind({});
export { Main as Message };

export default {
    title: 'UI/Message',
    component: Message,
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'This is a message.',
        },
    },
} as ComponentMeta<typeof Message>;
