import styled from 'styled-components';
import Button from '@components/ui/Button';
import Panel from '@components/ui/Panel';

export const Root = styled(Panel)({
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 16,
    maxWidth: 512,
    margin: '0 auto',
});

export const Layout = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 8,
});

export const Name = styled.div(({ theme }) => ({
    fontWeight: 800,
    fontSize: 48,
    lineHeight: `${theme.size.inputHeight}px`,
    color: theme.colors.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
        fontSize: 32,
    },
}));

export const ButtonGroup = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap',
    gap: 8,
    width: '100%',
});

export const ButtonGroupButton = styled(Button)({
    flex: 1,
});
