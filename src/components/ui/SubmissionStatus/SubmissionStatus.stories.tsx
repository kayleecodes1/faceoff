import { ComponentMeta, Story } from '@storybook/react';
import SubmissionStatus, { SubmissionState } from '@components/ui/SubmissionStatus';

const Main: Story = ({ state1, state2 }) => (
    <SubmissionStatus>
        {state1 && <SubmissionStatus.Item state={state1} />}
        {state2 && <SubmissionStatus.Item state={state2} />}
    </SubmissionStatus>
);
export { Main as SubmissionStatus };

export default {
    title: 'UI/SubmissionStatus',
    component: SubmissionStatus,
    argTypes: {
        state1: {
            control: 'select',
            options: Object.values(SubmissionState),
            defaultValue: Object.values(SubmissionState)[0],
        },
        state2: {
            control: 'select',
            options: [undefined, ...Object.values(SubmissionState)],
            defaultValue: undefined,
        },
    },
} as ComponentMeta<typeof SubmissionStatus>;
