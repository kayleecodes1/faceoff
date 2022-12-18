import { useContext } from 'react';
import PlayersContext, { PlayersContextValue } from './PlayersContext';

const usePlayersContext = (): PlayersContextValue => {
    const context = useContext(PlayersContext);
    if (context === null) {
        throw new Error('Attempted to use PlayersContext where none exists');
    }
    return context;
};

export default usePlayersContext;
