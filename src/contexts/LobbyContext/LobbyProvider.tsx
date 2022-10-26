import { Peer } from 'peerjs';
import { useEffect, useMemo, useState } from 'react';
import generateJoinCode from '@utilities/generateJoinCode';
import LobbyContext from './LobbyContext';

interface LobbyProviderProps {
    children?: React.ReactNode;
}

const LobbyProvider: React.FC<LobbyProviderProps> = ({ children }) => {
    const players = useState([]);
    console.log(generateJoinCode());
    const value = useMemo(() => ({}), []);

    useEffect(() => {
        const peer = new Peer();
    }, []);

    return (
        <LobbyContext.Provider value={value}>{children}</LobbyContext.Provider>
    );
};

export default LobbyProvider;
