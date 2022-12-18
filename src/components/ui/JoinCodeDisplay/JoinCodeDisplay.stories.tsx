import { ComponentMeta, ComponentStory } from '@storybook/react';
import JoinCodeDisplay from '@components/ui/JoinCodeDisplay';

const Template: ComponentStory<typeof JoinCodeDisplay> = (args) => (
    <JoinCodeDisplay {...args} />
);

const Main = Template.bind({});
export { Main as JoinCodeDisplay };

export default {
    title: 'UI/JoinCodeDisplay',
    component: JoinCodeDisplay,
    argTypes: {
        url: { control: 'text', defaultValue: 'faceoff.kayleecodes.dev' },
        joinCode: { control: 'text', defaultValue: 'A3B4C5' },
    },
} as ComponentMeta<typeof JoinCodeDisplay>;
