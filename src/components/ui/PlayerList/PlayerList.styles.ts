import FlipMove from 'react-flip-move';
import styled from 'styled-components';

const enterAnimation = {
    from: { opacity: '0', transform: 'translateX(-50px)' },
    to: { opacity: '1', transform: 'translateX(0)' },
};

const leaveAnimation = {
    from: { opacity: '1', transform: 'translateX(0)' },
    to: { opacity: '0', transform: 'translateX(-50px)' },
};

export const Root = styled(FlipMove).attrs({
    duration: 600,
    easing: 'ease-out',
    enterAnimation,
    leaveAnimation,
    staggerDelayBy: 100,
    staggerDurationBy: 50,
    typeName: 'ul',
})({
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 8,
    listStyle: 'none',
    padding: 8,
    margin: 0,
});

export const Item = styled.li({
    //
});
