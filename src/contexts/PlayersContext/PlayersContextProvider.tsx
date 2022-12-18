import HostPromptContext from './PlayersContext';

interface HostPromptProviderProps {
    children?: React.ReactNode;
}

const HostPromptProvider: React.FC<HostPromptProviderProps> = ({
    children,
}) => {
    // TODO: connect to mobx state
    return (
        <HostPromptContext.Provider value={null}>
            {children}
        </HostPromptContext.Provider>
    );
};

export default HostPromptProvider;
