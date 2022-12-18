import styled from 'styled-components';

export const Root = styled.div({
    position: 'absolute',
    inset: '0 0 0 0',
    overflow: 'hidden auto',
    padding: 24,
});

export const Container = styled.div(({ theme }) => ({
    display: 'block',
    maxWidth: theme.breakpoints.tablet,
    margin: '0 auto',
}));
