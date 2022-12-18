import type { InputHTMLAttributes } from 'react';
import { Root } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
    fullWidth = false,
    type = 'text',
    ...other
}) => {
    return <Root fullWidth={fullWidth} type={type} {...other} />;
};

export default Input;
