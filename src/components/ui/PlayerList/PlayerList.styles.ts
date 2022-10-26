import { TransitionStatus } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((n) => ({
    transform: `scale(${0.5 + 0.5 * n})`,
}));

const fadeInAnimation = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

export const Root = styled.ul({
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 8,
    listStyle: 'none',
    padding: 8,
    margin: 0,
});

export const Item = styled.li<{ state: TransitionStatus }>(
    {
        //
    },
    css`
        animation: ${bounceAnimation} 600ms linear both,
            ${fadeInAnimation} 300ms ease-out both;
    `,
);
