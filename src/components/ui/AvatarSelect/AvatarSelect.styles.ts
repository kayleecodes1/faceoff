import styled from 'styled-components';

export const Root = styled.ul<{ size: number }>(({ size, theme }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, ${size + 10}px)`,
    justifyContent: 'center',
    gap: 24,
    padding: 24,
    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
        gap: 16,
    },
}));

export const Item = styled.li({
    //
});

export const Button = styled.button<{
    isDisabled?: boolean;
    isSelected?: boolean;
}>(({ isDisabled = false, isSelected = false, theme }) => ({
    background: 'none',
    padding: 0,
    borderRadius: '100%',
    border: `5px solid ${isSelected ? theme.colors.white : 'transparent'}`,
    outline: isSelected
        ? `10px solid ${theme.colors.primary}`
        : '0 solid transparent',
    opacity: isDisabled ? 0.5 : 1,
    transition: 'outline-width 300ms ease-out',
    cursor: isDisabled ? 'not-allowed' : isSelected ? 'default' : 'pointer',
    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
        outlineWidth: isSelected ? 6 : 0,
    },
}));
