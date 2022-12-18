import { useContext } from 'react';
import type Client from '@store/client/Client';
import ClientContext from './ClientContext';

const useClient = (): Client => {
    const context = useContext(ClientContext);
    if (context === null) {
        throw new Error('Attempted to use ClientContext where none exists');
    }
    return context;
};

export default useClient;
