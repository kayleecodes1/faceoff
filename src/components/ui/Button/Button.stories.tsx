/*
children?: React.ReactNode;
disabled?: boolean;
fullWidth?: boolean;
isLoading?: boolean;
variant?: 'primary' | 'plain';
*/
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';

export default {
    title: 'UI/Button',
    component: Button,
    argTypes: {
        children: { control: 'text', defaultValue: 'Button' },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        isLoading: { control: 'boolean' },
        variant: {
            control: 'select',
            options: ['primary', 'plain'],
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const Main = Template.bind({});

export { Main as Button };
