import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';
import theme from './theme';

interface ThemeProviderProps {
    children?: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
    <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
