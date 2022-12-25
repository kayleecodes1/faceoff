import styled from 'styled-components';

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 32,
});

export const RoundLabel = styled.div(({ theme }) => ({
    position: 'absolute',
    top: 32,
    right: 32,
    fontWeight: 800,
    fontSize: 24,
    color: theme.colors.primaryDark,
    textTransform: 'uppercase',
}));
