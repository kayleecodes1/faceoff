import styled from 'styled-components';

export const Root = styled.div<{
    variant?: 'primary' | 'plain' | 'success' | 'error';
}>(({ theme, variant = 'primary' }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colors.white,
    background: {
        primary: theme.colors.primary,
        plain: theme.colors.primaryLighter,
        success: theme.colors.success,
        error: theme.colors.error,
    }[variant],
    borderRadius: theme.shape.borderRadius,
}));
