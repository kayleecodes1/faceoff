import styled from 'styled-components';

export const Root = styled.div({
    //
});

export const CodeLabel = styled.div(({ theme }) => ({
    fontWeight: 800,
    fontSize: 20,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 8,
}));

export const CodeValue = styled.div(({ theme }) => ({
    fontWeight: 800,
    fontSize: 64,
    color: theme.colors.secondary,
}));
