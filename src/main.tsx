import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from '@contexts/GlobalContext';
import StylesProvider from '@styles/StylesProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <StylesProvider>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </StylesProvider>
    </React.StrictMode>,
);
