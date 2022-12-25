import styled, { css } from 'styled-components';

import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((t) => ({
    transform: `scale(${0.4 + 0.6 * t})`,
}));

export const Root = styled.div<{ placement: 1 | 2 | 3 }>(
    ({ placement }) => ({
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        gap: 16,
        width: 'fit-content',
        transform: 'scale(0)',
        opacity: { 1: 1, 2: 0.8, 3: 0.6 }[placement],
    }),
    css`
        animation: ${bounceAnimation} 1000ms linear
            ${({ placement }: { placement: 1 | 2 | 3 }) => ({ 1: '0ms', 2: '1200ms', 3: '2400ms' }[placement])} forwards;
    `,
);

export const AvatarContainer = styled.div(({ theme }) => ({
    width: 'fit-content',
    padding: 8,
    borderRadius: '100%',
    border: `16px solid ${theme.colors.primaryLight}`,
}));

export const Placement = styled.div(({ theme }) => ({
    position: 'absolute',
    top: '14%',
    right: '14%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    fontWeight: 700,
    fontSize: 16,
    color: theme.colors.white,
    background: theme.colors.primary,
    borderRadius: '100%',
    transform: 'translate(50%, -50%)',
    strong: {
        fontWeight: 800,
        fontSize: 24,
    },
}));

export const Label = styled.span<{ size: 'small' | 'medium' | 'large' }>(({ size, theme }) => ({
    fontWeight: 800,
    fontSize: {
        small: 36,
        medium: 40,
        large: 44,
    }[size],
    color: theme.colors.primary,
    letterSpacing: 1.1,
    textAlign: 'center',
    textTransform: 'uppercase',
}));
