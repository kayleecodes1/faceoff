import styled from 'styled-components';

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: 48,
});

export const Container = styled.div({
    width: '100%',
    maxWidth: 350,
});

export const Divider = styled.div(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    fontWeight: 800,
    fontSize: 20,
    color: theme.colors.primaryDark,
    margin: '16px 0',
    '&::before, &::after': {
        content: '""',
        display: 'block',
        flex: 1,
        width: 50,
        height: 4,
        background: `${theme.colors.primaryLighter}88`,
        borderRadius: 2,
    },
}));
