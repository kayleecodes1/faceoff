import React from 'react';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import 'reset-css';
import GlobalStyles from './global/GlobalStyles';
import ThemeProvider from './theme/ThemeProvider';

// TODO css reset?

interface StylesProviderProps {
    children?: React.ReactNode;
}

const StylesProvider: React.FC<StylesProviderProps> = ({ children }) => (
    <ThemeProvider>
        <GlobalStyles />
        {children}
    </ThemeProvider>
);

export default StylesProvider;
