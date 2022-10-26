import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '@components/screens/Home';
import HostLobby from '@components/screens/HostLobby';
import PlayerLobby from '@components/screens/PlayerLobby';
import { LobbyProvider } from '@contexts/LobbyContext';
import StylesProvider from '@styles/StylesProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <StylesProvider>
            <LobbyProvider>
                <HostLobby />
            </LobbyProvider>
        </StylesProvider>
    </React.StrictMode>,
);
