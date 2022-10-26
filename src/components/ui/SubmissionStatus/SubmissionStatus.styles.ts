import styled from 'styled-components';

export const Root = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    gap: 8,
    width: 96,
    height: 32,
});
