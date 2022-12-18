import styled from 'styled-components';

export const Root = styled.div(({ theme }) => ({
    background: theme.colors.white,
    padding: 32,
    borderRadius: 8,
    borderBottom: `5px solid ${theme.colors.primaryLighter}`,
    boxShadow: `0 4px 8px 0px ${theme.colors.primaryDark}11`,
    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
        padding: 24,
    },
}));
