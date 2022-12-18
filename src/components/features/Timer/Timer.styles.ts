import styled from 'styled-components';

const IMAGE_SMALL_SIZE = 200;
const IMAGE_LARGE_SIZE = 464;

export const Root = styled.div({
    display: 'flex',
    flexFlow: 'column nowrap',
    width: 'fit-content',
});

export const Row = styled.div({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
});

export const ImageContainer = styled.div<{
    isShown?: boolean;
    size: 'small' | 'large';
}>(({ isShown = true, size, theme }) => ({
    position: 'relative',
    width: { small: IMAGE_SMALL_SIZE, large: IMAGE_LARGE_SIZE }[size],
    height: { small: IMAGE_SMALL_SIZE, large: IMAGE_LARGE_SIZE }[size],
    background: theme.colors.white,
    borderRadius: 16,
    border: `16px solid ${theme.colors.white}`,
    boxShadow: `0 4px 8px 0px ${theme.colors.primaryDark}11`,
    [ImageWrapper]: {
        '&::after': {
            opacity: isShown ? 0 : 1,
            transition: isShown ? 'opacity ease-in 1000ms' : undefined,
        },
    },
    [Image]: {
        filter: isShown ? 'blur(0)' : 'blur(20px)',
        transition: isShown ? 'filter ease-in 1000ms' : undefined,
    },
}));

export const ImageWrapper = styled.div(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        inset: '0 0 0 0',
        background: `${theme.colors.primaryLight}66 no-repeat center/64% url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFF' viewBox='0 0 52 52'%3E%3Cpath d='M29.563 40.469002a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4zM24.322266 6.0410156c-1.044564.114489-2.063091.374221-3.017579.7695313-3.81795 1.5812409-6.833984 5.4225611-6.833984 10.2265621a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-2.386094 1.331673-3.938443 3.130859-4.683593 1.799187-.745151 3.836554-.587275 5.523438 1.099609 1.686884 1.686884 1.84476 3.726204 1.099609 5.525391-.74515 1.799186-2.297499 3.128906-4.683593 3.128906a3.0003 3.0003 0 0 0-3 3v4.591797a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-2.060547c3.3652-.952655 5.99389-3.388913 7.226562-6.365235 1.581241-3.81795.998227-8.665835-2.398437-12.0624995-2.547499-2.5474986-5.913183-3.5133888-9.046875-3.1699219Z'/%3E%3C/svg%3E")`,
        zIndex: 10,
    },
}));

export const Image = styled.img({
    width: '100%',
    height: '100%',
    background: 'none',
});

export const Connection = styled.div<{ isFilled?: boolean }>(
    ({ isFilled = false, theme }) => ({
        position: 'relative',
        width: IMAGE_SMALL_SIZE,
        height: 64,
        overflow: 'hidden',
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 16,
            transform: 'translateX(-50%)',
        },
        '&::before': {
            height: '100%',
            background: theme.colors.primaryLighter,
            zIndex: 10,
        },
        '&::after': {
            height: isFilled ? '100%' : 0,
            background: theme.colors.white,
            boxShadow: `0 4px 8px 0px ${theme.colors.primaryDark}11`,
            zIndex: 20,
            transition: isFilled ? 'height ease-out 1600ms 600ms' : undefined,
        },
    }),
);
