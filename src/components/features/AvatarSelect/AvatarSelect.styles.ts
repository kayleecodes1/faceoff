import styled, { css } from 'styled-components';
import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((t) => ({
    outlineWidth: t * 10,
}));

export const Root = styled.ul<{ size: number }>(({ size }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, ${size + 10}px)`,
    justifyContent: 'center',
    gap: 24,
    padding: 24,
}));

export const Item = styled.li({
    //
});

export const Button = styled.button<{
    isDisabled?: boolean;
    isSelected?: boolean;
}>(
    ({ isDisabled = false, isSelected = false, theme }) => ({
        background: 'none',
        padding: 0,
        borderRadius: '100%',
        border: `5px solid ${isSelected ? theme.colors.white : 'transparent'}`,
        outline: `10px solid ${
            isSelected ? theme.colors.primary : 'transparent'
        }`,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : isSelected ? 'default' : 'pointer',
    }),
    ({ isSelected }) =>
        isSelected &&
        css`
            animation: ${bounceAnimation} 500ms linear forwards;
        `,
);
