import styled from 'styled-components';

export const Root = styled.div(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 16,
    width: 'fit-content',
    fontWeight: 400,
    fontSize: 18,
    color: theme.colors.text.body,
    letterSpacing: 1.1,
    textAlign: 'center',
}));

export const Row = styled.p({
    margin: 0,
});

export const Url = styled.strong(({ theme }) => ({
    fontSize: 24,
    fontWeight: 800,
    color: theme.colors.primary,
}));

export const JoinCode = styled.strong(({ theme }) => ({
    fontWeight: 800,
    fontSize: 64,
    color: theme.colors.primary,
    textTransform: 'uppercase',
}));
