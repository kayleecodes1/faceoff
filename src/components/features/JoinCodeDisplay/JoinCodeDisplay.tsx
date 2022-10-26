import { Root, CodeLabel, CodeValue } from './JoinCodeDisplay.styles';
import Panel from '@components/ui/Panel';

interface LobbyHostProps {
    url: string;
    joinCode: string;
}

const LobbyHost: React.FC<LobbyHostProps> = ({ url, joinCode }) => {
    return (
        <Root>
            <Panel>
                <div>Join at {url}</div>
                <CodeLabel>with Join Code</CodeLabel>
                <CodeValue>{joinCode}</CodeValue>
            </Panel>
        </Root>
    );
};

export default LobbyHost;
