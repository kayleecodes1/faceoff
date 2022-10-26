import styled, { css } from 'styled-components';
import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((t) => ({
    transform: `scale(${0.4 + 0.6 * t})`,
}));

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    gap: 8,
});

export const Card = styled.li(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    gap: 8,
    width: 300,
    height: 56,
    borderRadius: 28,
    background: theme.colors.white,
    border: `3px solid ${theme.colors.primaryLighter}`,
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

export const Points = styled.div(
    ({ theme }) => ({
        position: 'relative',
        flexShrink: 0,
        fontWeight: 800,
        fontSize: 17,
        color: theme.colors.primary,
        marginRight: 16,
    }),
    css`
        animation: ${bounceAnimation} 1000ms linear forwards;
    `,
);
// TODO we don't want bounce on mount ... could just not apply animation class if points === 0
