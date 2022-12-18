import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '@components/ui/Input';

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const Main = Template.bind({});
export { Main as Input };

export default {
    title: 'UI/Input',
    component: Input,
    argTypes: {
        fullWidth: { control: 'boolean' },
    },
} as ComponentMeta<typeof Input>;
