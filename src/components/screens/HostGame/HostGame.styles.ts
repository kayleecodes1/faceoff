import styled from 'styled-components';

export const Root = styled.div({
    position: 'absolute',
    inset: '0 0 0 0',
    display: 'flex',
    flexFlow: 'row nowrap',
});

export const Sidebar = styled.div({
    flexShrink: 0,
    width: 450,
});

export const Content = styled.div({
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 32,
});
