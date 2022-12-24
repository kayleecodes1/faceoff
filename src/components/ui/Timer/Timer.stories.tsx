import { ComponentMeta, ComponentStory } from '@storybook/react';
import Timer from '@components/ui/Timer';

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />;

const Main = Template.bind({});
export { Main as Timer };

export default {
    title: 'UI/Timer',
    component: Timer,
    argTypes: {
        numDivisions: { control: 'number', defaultValue: 3 },
        timeElapsed: { control: 'number', defaultValue: 45 },
        timeLimit: { control: 'number', defaultValue: 60 },
        variant: {
            control: 'select',
            options: ['default', 'warn'],
        },
    },
} as ComponentMeta<typeof Timer>;
