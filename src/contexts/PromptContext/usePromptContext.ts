import { useContext } from 'react';
import PromptContext, { PromptContextValue } from './PromptContext';

const useHostPromptContext = (): PromptContextValue => {
    const context = useContext(PromptContext);
    if (context === null) {
        throw new Error('Attempted to use HostPromptContext where none exists');
    }
    return context;
};

export default useHostPromptContext;
