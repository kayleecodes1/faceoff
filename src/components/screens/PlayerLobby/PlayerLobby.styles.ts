import styled from 'styled-components';

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 24,
    padding: 24,
});

export const Container = styled.div<{ size?: 'small' }>(
    ({ size = 'large' }) => ({
        width: '100%',
        maxWidth: {
            small: 450,
            large: 1000,
        }[size],
    }),
);
