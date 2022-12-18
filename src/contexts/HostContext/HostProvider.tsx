import type Host from '@store/host/Host';
import HostContext from './HostContext';

interface HostProviderProps {
    children?: React.ReactNode;
    host: Host;
}

const HostProvider: React.FC<HostProviderProps> = ({ children, host }) => {
    return <HostContext.Provider value={host}>{children}</HostContext.Provider>;
};

export default HostProvider;
