import type { InputHTMLAttributes } from 'react';
import { Root } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    hasError?: boolean;
}

const Input: React.FC<InputProps> = ({
    fullWidth = false,
    hasError = false,
    type = 'text',
    ...other
}) => {
    return <Root fullWidth hasError={hasError} type={type} {...other} />;
};

export default Input;
