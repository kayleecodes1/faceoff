import styled, { css, keyframes } from 'styled-components';

const pulseAnimation = keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' },
});

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 16,
    width: 'fit-content',
});

export const Label = styled.div<{ variant?: 'default' | 'warn' }>(
    ({ theme, variant = 'default' }) => ({
        fontWeight: 800,
        fontSize: 48,
        color: {
            default: theme.colors.primary,
            warn: theme.colors.error,
        }[variant],
        textAlign: 'center',
        transition: 'color 300ms linear',
    }),
    ({ variant }) =>
        variant === 'warn' &&
        css`
            animation: ${pulseAnimation} 1200ms linear infinite;
        `,
);

export const ProgressBar = styled.div<{ progress: number }>(({ progress, theme }) => ({
    position: 'relative',
    width: 360,
    height: 36,
    background: theme.colors.primaryLighter,
    borderRadius: 8,
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: '0 auto 0 0',
        width: `${progress * 100}%`,
        background: theme.colors.primary,
    },
}));

export const Divider = styled.div(({ theme }) => ({
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
    background: theme.colors.primaryLight,
}));
