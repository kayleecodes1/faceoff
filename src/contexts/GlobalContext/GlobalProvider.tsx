import { useCallback, useMemo, useRef, useState } from 'react';
import Client from '@store/client/Client';
import Host from '@store/host/Host';
import generateJoinCode from '@utilities/generateJoinCode';
import GlobalContext, { ClientState, HostState, JoinFormInitialValues } from './GlobalContext';

const LOCAL_STORAGE_KEY_JOIN_FORM = 'FaceOff::joinForm';

const getJoinFormInitialValues = (): JoinFormInitialValues | undefined => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY_JOIN_FORM);
    return json && JSON.parse(json);
};

interface GlobalProviderProps {
    children?: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const joinFormInitialValues = useRef<JoinFormInitialValues | undefined>(getJoinFormInitialValues());
    const [hostState, setHostState] = useState<HostState>({
        isConnecting: false,
        host: null,
        error: null,
    });
    const [clientState, setClientState] = useState<ClientState>({
        isConnecting: false,
        client: null,
        error: null,
    });

    const createHost = useCallback(async () => {
        setHostState({ isConnecting: true, host: null, error: null });
        const joinCode = generateJoinCode();
        try {
            const host = await Host.create(joinCode);
            setHostState((previousState) => ({ ...previousState, host }));
        } catch (error) {
            setHostState((previousState) => ({
                ...previousState,
                error: String(error),
            }));
        }
        setHostState((previousState) => ({
            ...previousState,
            isConnecting: false,
        }));
    }, []);

    const createClient = useCallback(async (joinCode: string, name: string) => {
        setClientState({ isConnecting: true, client: null, error: null });
        try {
            const client = await Client.create(joinCode, name);
            setClientState((previousState) => ({ ...previousState, client }));
            localStorage.setItem(LOCAL_STORAGE_KEY_JOIN_FORM, JSON.stringify({ joinCode, name }));
        } catch (error) {
            console.log(error);
            setClientState((previousState) => ({
                ...previousState,
                error: String(error),
            }));
            localStorage.removeItem(LOCAL_STORAGE_KEY_JOIN_FORM);
        }
        setClientState((previousState) => ({
            ...previousState,
            isConnecting: false,
        }));
    }, []);

    const value = useMemo(
        () => ({
            createClient,
            createHost,
            clientState,
            hostState,
            joinFormInitialValues: joinFormInitialValues.current,
        }),
        [createClient, createHost, clientState, hostState],
    );

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
