import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvatarSelect from '@components/ui/AvatarSelect';
import { AvatarImage } from '@store/common/common.types';

const Template: ComponentStory<typeof AvatarSelect> = ({ disabledValues, onChange, ...args }) => {
    const [, updateArgs] = useArgs();

    const handleChange = (value: AvatarImage) => {
        onChange?.(value);
        updateArgs({ value });
    };

    return <AvatarSelect disabledValues={new Set(disabledValues)} onChange={handleChange} {...args} />;
};

const Main = Template.bind({});
export { Main as AvatarSelect };

export default {
    title: 'UI/AvatarSelect',
    component: AvatarSelect,
    argTypes: {
        disabledValues: {
            control: 'multi-select',
            options: Object.values(AvatarImage),
        },
        onChange: { action: 'changed' },
        value: {
            control: 'select',
            options: Object.values(AvatarImage),
        },
    },
} as ComponentMeta<typeof AvatarSelect>;
