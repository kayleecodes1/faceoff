import { ComponentMeta, Story } from '@storybook/react';
import defaultTheme from '@styles/theme/theme';
import X from '@components/icons/X';

const Template: Story = ({ color, ...args }) => (
    <div style={{ color }}>
        <X {...args} />
    </div>
);

const Main = Template.bind({});
export { Main as X };

export default {
    title: 'Icons/X',
    component: X,
    argTypes: {
        color: { control: 'color', defaultValue: defaultTheme.colors.primary },
        isAnimated: { control: 'boolean' },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof X>;
