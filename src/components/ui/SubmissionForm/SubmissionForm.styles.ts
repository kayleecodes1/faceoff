import styled, { css } from 'styled-components';
import createBounceAnimation from '@styles/animations/createBounceAnimation';

const bounceAnimation = createBounceAnimation((t) => ({
    outlineWidth: t * 10,
}));

export const Root = styled.form({
    //
});

export const Grid = styled.ul<{ size: number }>(({ size }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, ${size}px)`,
    justifyContent: 'center',
    gap: 24,
    padding: 24,
}));

export const Item = styled.li({
    //
});

export const AvatarWrapper = styled.div<{
    isDisabled?: boolean;
    isSelected?: boolean;
}>(
    ({ isDisabled = false }) => ({
        position: 'relative',
        background: 'none',
        padding: 0,
        borderRadius: '100%',
        opacity: isDisabled ? 0.5 : 1,
    }),
    ({ isSelected }) =>
        isSelected &&
        css`
            animation: ${bounceAnimation} 500ms linear forwards;
        `,
);

export const AvatarInput = styled.input<{
    isSelected?: boolean;
}>(({ isSelected }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 10,
    cursor: isSelected ? 'default' : 'pointer',
    '&:disabled': {
        cursor: 'not-allowed',
    },
}));
