import type { ButtonHTMLAttributes } from 'react';
import Spinner from '@components/icons/Loading';
import { Root } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    variant?: 'primary' | 'plain';
}

const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    fullWidth = false,
    isLoading = false,
    type = 'button',
    variant = 'primary',
    ...other
}) => {
    return (
        <Root
            disabled={disabled || isLoading}
            fullWidth={fullWidth}
            isLoading={isLoading}
            type={type}
            variant={variant}
            {...other}
        >
            {isLoading ? <Spinner /> : children}
        </Root>
    );
};

export default Button;
