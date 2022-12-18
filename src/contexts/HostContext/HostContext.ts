import { createContext } from 'react';
import type Host from '@store/host/Host';

const HostContext = createContext<Host | null>(null);

export default HostContext;
