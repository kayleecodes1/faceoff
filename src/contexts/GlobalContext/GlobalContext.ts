import { createContext } from 'react';
import type Client from '@store/client/Client';
import type Host from '@store/host/Host';

export interface HostState {
    isConnecting: boolean;
    host: Host | null;
    error: string | null;
}

export interface ClientState {
    isConnecting: boolean;
    client: Client | null;
    error: string | null;
}

export interface JoinFormInitialValues {
    joinCode: string;
    name: string;
}

export interface GlobalContextValue {
    clientState: ClientState;
    createClient: (joinCode: string, name: string) => Promise<void>;
    createHost: () => Promise<void>;
    hostState: HostState;
    joinFormInitialValues?: JoinFormInitialValues;
}

const GlobalContext = createContext<GlobalContextValue | null>(null);

export default GlobalContext;
