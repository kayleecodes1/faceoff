import Checkmark from '@components/icons/Checkmark';
import QuestionMark from '@components/icons/QuestionMark';
import Typing from '@components/icons/Typing';
import X from '@components/icons/X';
import { Root } from './Item.styles';

export enum SubmissionState {
    Pending = 'Pending',
    Submitted = 'Submitted',
    Unknown = 'Unknown',
    Success = 'Success',
    Error = 'Error',
}

const itemAttributes = {
    [SubmissionState.Pending]: {
        Icon: Typing,
        variant: 'plain' as const,
    },
    [SubmissionState.Submitted]: {
        Icon: Checkmark,
        variant: 'primary' as const,
    },
    [SubmissionState.Unknown]: {
        Icon: QuestionMark,
        variant: 'plain' as const,
    },
    [SubmissionState.Success]: {
        Icon: Checkmark,
        variant: 'success' as const,
    },
    [SubmissionState.Error]: {
        Icon: X,
        variant: 'error' as const,
    },
};

export interface ItemProps {
    state: SubmissionState;
}

const Item: React.FC<ItemProps> = ({ state }) => {
    const { Icon, variant } = itemAttributes[state];
    return (
        <Root variant={variant}>
            <Icon isAnimated size={32} />
        </Root>
    );
};

Item.displayName = 'SubmissionStatus.Item';

export default Item;
