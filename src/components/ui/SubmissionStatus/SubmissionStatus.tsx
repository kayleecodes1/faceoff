import Item from './Item';
import type { ItemProps } from './Item';
import { Root } from './SubmissionStatus.styles';

export interface SubmissionStatusProps {
    children?: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
}

interface SubmissionStatusChildComponents {
    Item: typeof Item;
}

const SubmissionStatus: React.FC<SubmissionStatusProps> &
    SubmissionStatusChildComponents = ({ children }) => {
    return <Root>{children}</Root>;
};

SubmissionStatus.Item = Item;

export default SubmissionStatus;
