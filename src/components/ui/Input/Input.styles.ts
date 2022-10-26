import styled from 'styled-components';

export const Root = styled.input<{ fullWidth?: boolean; hasError?: boolean }>(
    ({ fullWidth = false, hasError = false, theme }) => ({
        display: fullWidth ? 'block' : 'inline-block',
        width: fullWidth ? '100%' : undefined,
        height: theme.size.inputHeight,
        fontWeight: 800,
        fontSize: 20,
        color: theme.colors.primaryDark,
        textAlign: 'center',
        textTransform: 'uppercase',
        background: theme.colors.white,
        borderRadius: theme.shape.borderRadius,
        border: `2px solid ${theme.colors.primaryLighter}`,
        outline: 0,
        '&:focus': {
            borderColor: hasError ? undefined : theme.colors.primary,
        },
        borderColor: hasError ? theme.colors.error : undefined, // TODO
    }),
);
