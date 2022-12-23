import styled, { css, keyframes } from 'styled-components';

const animation1 = keyframes({
    '0%, 10%': { r: 0 },
    '20%, 100%': { r: 2.5 },
});

const animation2 = keyframes({
    '0%, 30%': { r: 0 },
    '40%, 100%': { r: 2.5 },
});

const animation3 = keyframes({
    '0%, 50%': { r: 0 },
    '60%, 100%': { r: 2.5 },
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
        animation: ${({ position }: { position: 1 | 2 | 3 }) =>
                ({
                    [1]: animation1,
                    [2]: animation2,
                    [3]: animation3,
                }[position])}
            2000ms ease-out infinite;
    `,
);
