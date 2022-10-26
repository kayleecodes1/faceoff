import styled, { css, keyframes } from 'styled-components';

const animation = keyframes({
    '0%': { strokeDashoffset: 48 },
    '100%': { strokeDashoffset: 0 },
});

export const Root = styled.svg<{ size: number }>(({ size }) => ({
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentcolor',
    strokeWidth: 6,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
}));

export const Check = styled.path<{ isAnimated?: boolean }>(
    {
        strokeDasharray: 48,
    },
    ({ isAnimated = false }) =>
        isAnimated &&
        css`
            animation: ${animation} 300ms cubic-bezier(0.65, 0, 0.45, 1) both;
        `,
);
