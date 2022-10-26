import styled from 'styled-components';

export const Root = styled.label(({ theme }) => ({
    display: 'block',
    fontWeight: 700,
    color: theme.colors.primaryDark,
    marginBottom: 4,
}));
