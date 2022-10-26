import { Root } from './Label.styles';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, ...other }) => {
    return <Root {...other}>{children}</Root>;
};

export default Label;
