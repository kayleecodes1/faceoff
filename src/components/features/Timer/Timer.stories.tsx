import { ComponentMeta, ComponentStory } from '@storybook/react';
import Timer from '@components/features/Timer';

const Template: ComponentStory<typeof Timer> = ({ ...args }) => {
    return <Timer {...args} />;
};

const Main = Template.bind({});
export { Main as Timer };

export default {
    title: 'Features/Timer',
    component: Timer,
    argTypes: {
        startTime: { control: 'number', defaultValue: Date.now() },
        endTime: { control: 'number', defaultValue: Date.now() + 30000 },
    },
} as ComponentMeta<typeof Timer>;
