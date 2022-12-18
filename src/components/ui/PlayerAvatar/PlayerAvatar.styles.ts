import styled from 'styled-components';

export const Root = styled.div<{
    background?: 'default' | 'highlight' | 'success' | 'error';
    size: number;
}>(({ background = 'default', size, theme }) => ({
    position: 'relative',
    width: size,
    height: size,
    background: {
        default: theme.colors.primaryLighter,
        highlight: theme.colors.primaryLight,
        success: theme.colors.success,
        error: theme.colors.error,
    }[background],
    borderRadius: '100%',
}));

export const Image = styled.img({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
});
