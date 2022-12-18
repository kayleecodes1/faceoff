import { ComponentMeta, Story } from '@storybook/react';
import defaultTheme from '@styles/theme/theme';
import QuestionMark from '@components/icons/QuestionMark';

const Template: Story = ({ color, ...args }) => (
    <div style={{ color }}>
        <QuestionMark {...args} />
    </div>
);

const Main = Template.bind({});
export { Main as QuestionMark };

export default {
    title: 'Icons/QuestionMark',
    component: QuestionMark,
    argTypes: {
        color: { control: 'color', defaultValue: defaultTheme.colors.primary },
        isAnimated: { control: 'boolean' },
        size: { control: 'number' },
    },
} as ComponentMeta<typeof QuestionMark>;
