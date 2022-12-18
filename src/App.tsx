import ClientGame from '@components/screens/ClientGame';
import Home from '@components/screens/Home';
import HostGame from '@components/screens/HostGame';
import { ClientProvider } from '@contexts/ClientContext';
import { useGlobalContext } from '@contexts/GlobalContext';
import { HostProvider } from '@contexts/HostContext';

const App: React.FC = () => {
    const { clientState, hostState } = useGlobalContext();

    if (clientState.client) {
        return (
            <ClientProvider client={clientState.client}>
                <ClientGame />
            </ClientProvider>
        );
    }

    if (hostState.host) {
        return (
            <HostProvider host={hostState.host}>
                <HostGame />
            </HostProvider>
        );
    }

    return <Home />;
};

export default App;
