import styled, { css, keyframes } from 'styled-components';
import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((t) => ({
    transform: `scale(${0.4 + 0.6 * t})`,
}));

const deltaAnimation = keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
    '100%': {
        transform: 'translateY(-100%)',
        opacity: 0,
    },
});

export const Root = styled.li<{ isConnected?: boolean }>(({ isConnected = true, theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    gap: 8,
    width: 300,
    height: 56,
    borderRadius: 28,
    background: theme.colors.white,
    border: `3px solid ${theme.colors.primaryLighter}`,
    opacity: isConnected ? 1 : 0.5,
}));

export const AvatarContainer = styled.div({
    flexShrink: 0,
    width: 44,
    height: 44,
    marginLeft: 3,
});

export const Name = styled.div(({ theme }) => ({
    flex: 1,
    fontWeight: 800,
    fontSize: 20,
    color: theme.colors.primaryDark,
    textTransform: 'uppercase',
}));

export const Points = styled.div({
    position: 'relative',
    marginRight: 16,
});

export const PointsValue = styled.div(
    ({ theme }) => ({
        flexShrink: 0,
        fontWeight: 800,
        fontSize: 24,
        color: theme.colors.primary,
    }),
    css`
        animation: ${bounceAnimation} 1000ms linear forwards;
    `,
); // TODO don't bounce points on mount

export const PointsDelta = styled.div(
    ({ theme }) => ({
        position: 'absolute',
        top: 0,
        left: '100%',
        fontWeight: 800,
        fontSize: 28,
        color: theme.colors.secondary,
    }),
    css`
        animation: ${deltaAnimation} 1000ms ease-out forwards;
    `,
);
