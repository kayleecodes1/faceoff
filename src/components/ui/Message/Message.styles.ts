import styled from 'styled-components';

export const Root = styled.p(({ theme }) => ({
    fontSize: 24,
    fontWeight: 800,
    color: theme.colors.primaryDark,
    textAlign: 'center',
    margin: 0,
}));
