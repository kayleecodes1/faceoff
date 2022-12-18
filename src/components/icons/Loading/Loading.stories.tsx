import { ComponentMeta, Story } from '@storybook/react';
import defaultTheme from '@styles/theme/theme';
import Loading from '@components/icons/Loading';

const Template: Story = ({ color, ...args }) => (
    <div style={{ color }}>
        <Loading {...args} />
    </div>
);

const Main = Template.bind({});
export { Main as Loading };

export default {
    title: 'Icons/Loading',
    component: Loading,
    argTypes: {
        color: { control: 'color', defaultValue: defaultTheme.colors.primary },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof Loading>;
