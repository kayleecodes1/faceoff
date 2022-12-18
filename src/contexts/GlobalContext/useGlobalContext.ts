import { useContext } from 'react';
import GlobalContext, { GlobalContextValue } from './GlobalContext';

const useGlobalContext = (): GlobalContextValue => {
    const context = useContext(GlobalContext);
    if (context === null) {
        throw new Error('Attempted to use GlobalContext where none exists');
    }
    return context;
};

export default useGlobalContext;
