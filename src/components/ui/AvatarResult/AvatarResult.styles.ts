import styled from 'styled-components';

export const Root = styled.div({
    position: 'relative',
    width: 'fit-content',
});

export const Result = styled.div<{
    variant: 'unknown' | 'correct' | 'incorrect';
}>(({ theme, variant }) => ({
    position: 'absolute',
    inset: 'auto auto 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    background: {
        unknown: theme.colors.primaryLighter,
        correct: theme.colors.success,
        incorrect: theme.colors.error,
    }[variant],
    color: '#FFF',
    borderRadius: '100%',
    transform: 'translate(-50%, 50%)',
}));
