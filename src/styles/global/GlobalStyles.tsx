import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle(({ theme }) => ({
    'html, body': {
        fontFamily: theme.typefaces.body,
        color: theme.colors.text.body,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        background: theme.colors.background,
    },
    '*': {
        boxSizing: 'border-box',
        fontFamily: theme.typefaces.body,
    },
    'a:focus': {
        outline: `${theme.colors.primary} auto 5px`,
    },
}));

export default GlobalStyles;
