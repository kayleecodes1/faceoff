import type Client from '@store/client/Client';
import ClientContext from './ClientContext';

interface ClientProviderProps {
    children?: React.ReactNode;
    client: Client;
}

const ClientProvider: React.FC<ClientProviderProps> = ({
    children,
    client,
}) => {
    // TODO need to listen for the client leaving the game so we can clear this context
    return (
        <ClientContext.Provider value={client}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;
