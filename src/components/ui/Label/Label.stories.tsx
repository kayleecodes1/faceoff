import { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from '@components/ui/Label';

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

const Main = Template.bind({});
export { Main as Label };

export default {
    title: 'UI/Label',
    component: Label,
    argTypes: {
        children: { control: 'text', defaultValue: 'Label' },
    },
} as ComponentMeta<typeof Label>;
