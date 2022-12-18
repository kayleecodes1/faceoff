import styled from 'styled-components';

export const Root = styled.button<{
    fullWidth?: boolean;
    isLoading?: boolean;
    variant?: 'primary' | 'plain';
}>(({ fullWidth = false, isLoading = false, theme, variant = 'primary' }) => ({
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'fit-content',
    height: theme.size.inputHeight,
    fontWeight: 800,
    fontSize: 20,
    color: {
        primary: theme.colors.white,
        plain: theme.colors.plainDarker,
    }[variant],
    textTransform: 'uppercase',
    background: {
        primary: theme.colors.primary,
        plain: theme.colors.plain,
    }[variant],
    padding: '0 16px',
    borderRadius: theme.shape.borderRadius,
    border: 0,
    borderBottom: '5px solid',
    borderBottomColor: {
        primary: theme.colors.primaryDark,
        plain: theme.colors.plainDark,
    }[variant],
    cursor: 'pointer',
    '&:focus-visible': {
        outline: `3px solid ${theme.colors.primaryLighter}`,
    },
    '&:enabled:active': {
        height: theme.size.inputHeight - 5,
        borderBottom: 0,
        marginTop: 5,
    },
    '&:disabled': {
        opacity: isLoading ? undefined : 0.7,
    },
    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
        height: 40,
        fontSize: 16,
        padding: '0 12px',
    },
}));
