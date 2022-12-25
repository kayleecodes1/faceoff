import styled from 'styled-components';

export const Root = styled.p(({ theme }) => ({
    fontWeight: 700,
    fontSize: 18,
    color: theme.colors.primaryDark,
    letterSpacing: 1.1,
    textAlign: 'center',
    margin: 0,
    strong: {
        fontSize: 24,
        fontWeight: 800,
        color: theme.colors.primary,
        textAlign: 'center',
    },
}));
