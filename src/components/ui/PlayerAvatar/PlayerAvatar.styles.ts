import styled from 'styled-components';

export const Root = styled.div<{
    background?: 'default' | 'highlight';
    size: number;
}>(({ background = 'default', size, theme }) => ({
    position: 'relative',
    width: size,
    height: size,
    background: {
        default: theme.colors.primaryLighter,
        highlight: theme.colors.primaryLight,
    }[background],
    borderRadius: '100%',
}));

export const Image = styled.img(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
}));
