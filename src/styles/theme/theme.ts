import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    interface DefaultTheme {
        breakpoints: {
            mobileSmall: string;
            mobile: string;
            tablet: string;
            desktop: string;
        };
        colors: {
            background: string;
            error: string;
            plain: string;
            plainDark: string;
            plainDarker: string;
            primary: string;
            primaryLight: string;
            primaryLighter: string;
            primaryDark: string;
            secondary: string;
            success: string;
            text: {
                body: string;
                heading: string;
            };
            white: string;
        };
        shape: {
            borderRadius: number;
        };
        size: {
            inputHeight: number;
        };
        typefaces: {
            body: string;
            heading: string;
        };
    }
}

const defaultTheme: DefaultTheme = {
    breakpoints: {
        mobileSmall: '320px',
        mobile: '425px',
        tablet: '768px',
        desktop: '2560px',
    },
    colors: {
        background: '#EDEFFF',
        error: '#F47070',
        plain: '#E5E6F0',
        plainDark: '#B5B5C1',
        plainDarker: '#757585',
        primary: '#5F67EA',
        primaryLight: '#959BFF',
        primaryLighter: '#D0D2F2',
        primaryDark: '#4E4893',
        secondary: '#FA77A2', // TODO remove?
        success: '#88CC58',
        text: {
            body: '#242142',
            heading: '#16132D',
        },
        white: '#F6F7FE',
    },
    shape: {
        borderRadius: 8,
    },
    size: {
        inputHeight: 50,
    },
    typefaces: {
        heading: '"Nunito", sans-serif',
        body: '"Nunito", sans-serif',
    },
};

export default defaultTheme;
