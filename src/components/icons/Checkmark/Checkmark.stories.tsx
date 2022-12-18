import { ComponentMeta, Story } from '@storybook/react';
import defaultTheme from '@styles/theme/theme';
import Checkmark from '@components/icons/Checkmark';

const Template: Story = ({ color, ...args }) => (
    <div style={{ color }}>
        <Checkmark {...args} />
    </div>
);

const Main = Template.bind({});
export { Main as Checkmark };

export default {
    title: 'Icons/Checkmark',
    component: Checkmark,
    argTypes: {
        color: { control: 'color', defaultValue: defaultTheme.colors.primary },
        isAnimated: { control: 'boolean' },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof Checkmark>;
