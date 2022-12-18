import { ComponentMeta, Story } from '@storybook/react';
import defaultTheme from '@styles/theme/theme';
import Typing from '@components/icons/Typing';

const Template: Story = ({ color, ...args }) => (
    <div style={{ color }}>
        <Typing {...args} />
    </div>
);

const Main = Template.bind({});
export { Main as Typing };

export default {
    title: 'Icons/Typing',
    component: Typing,
    argTypes: {
        color: { control: 'color', defaultValue: defaultTheme.colors.primary },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof Typing>;
