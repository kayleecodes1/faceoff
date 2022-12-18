import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChangeNameForm from '@components/ui/ChangeNameForm';

const Template: ComponentStory<typeof ChangeNameForm> = ({
    onSubmit,
    ...args
}) => {
    const [, updateArgs] = useArgs();

    const handleSubmit = async (value: string) => {
        onSubmit(value);
        updateArgs({ value });
    };

    return <ChangeNameForm onSubmit={handleSubmit} {...args} />;
};

const Main = Template.bind({});
export { Main as ChangeNameForm };

export default {
    title: 'UI/ChangeNameForm',
    component: ChangeNameForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
        value: { control: 'text', defaultValue: 'Name' },
    },
} as ComponentMeta<typeof ChangeNameForm>;
