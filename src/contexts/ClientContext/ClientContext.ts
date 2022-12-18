import { createContext } from 'react';
import type Client from '@store/client/Client';

const ClientContext = createContext<Client | null>(null);

export default ClientContext;
