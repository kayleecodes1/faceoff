import styled, { css, keyframes } from 'styled-components';

const lineAnimation = keyframes({
    '0%': { strokeDashoffset: 43 },
    '100%': { strokeDashoffset: 86 },
});

const dotAnimation = keyframes({
    '0%': { r: 0 },
    '100%': { r: 4 },
});

export const Root = styled.svg<{ size: number }>(({ size }) => ({
    width: size,
    height: size,
    fill: 'none',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
}));

export const Line = styled.path<{ isAnimated?: boolean }>(
    {
        stroke: 'currentcolor',
        strokeWidth: 6,
        strokeDasharray: 43,
    },
    ({ isAnimated = false }) =>
        isAnimated &&
        css`
            animation: ${lineAnimation} 200ms cubic-bezier(0.65, 0, 0.45, 1)
                both;
            animation-delay: 100ms;
        `,
);

export const Dot = styled.circle<{ isAnimated?: boolean }>(
    {
        r: 4,
        fill: 'currentcolor',
    },
    ({ isAnimated = false }) =>
        isAnimated &&
        css`
            animation: ${dotAnimation} 100ms ease-in both;
        `,
);
