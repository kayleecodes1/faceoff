import styled, { css, keyframes } from 'styled-components';

const animation = keyframes({
    '30%': { r: 0.2 },
    '70%, 100%': { r: 2.5 },
});

export const Root = styled.svg<{ size: number }>(({ size }) => ({
    width: size,
    height: size,
    fill: 'currentcolor',
}));

export const Dot = styled.circle<{ position: 1 | 2 | 3 }>(
    {
        r: 2.5,
    },
    css`
        animation: ${animation} 1000ms ease-in-out infinite;
    `,
    ({ position }) => ({
        animationDelay: {
            [1]: undefined,
            [2]: '-812ms',
            [3]: '-625ms',
        }[position],
    }),
);
