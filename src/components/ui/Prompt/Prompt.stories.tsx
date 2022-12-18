import { ComponentMeta, ComponentStory } from '@storybook/react';
import prompt from '@data/prompts/01';
import Prompt from '@components/ui/Prompt';

const Template: ComponentStory<typeof Prompt> = ({ ...args }) => {
    return <Prompt {...args} />;
};

const Main = Template.bind({});
Main.args = {
    prompt: prompt,
};
export { Main as Prompt };

export default {
    title: 'UI/Prompt',
    component: Prompt,
    argTypes: {
        showSourceA: { control: 'boolean', defaultValue: false },
        showSourceB: { control: 'boolean', defaultValue: false },
        showResult: { control: 'boolean', defaultValue: false },
    },
} as ComponentMeta<typeof Prompt>;
