import { useContext } from 'react';
import type Host from '@store/host/Host';
import HostContext from './HostContext';

const useHost = (): Host => {
    const context = useContext(HostContext);
    if (context === null) {
        throw new Error('Attempted to use HostContext where none exists');
    }
    return context;
};

export default useHost;
