import { ComponentMeta, ComponentStory } from '@storybook/react';
import Panel from '@components/ui/Panel';

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

const Main = Template.bind({});
export { Main as Panel };

export default {
    title: 'UI/Panel',
    component: Panel,
} as ComponentMeta<typeof Panel>;
