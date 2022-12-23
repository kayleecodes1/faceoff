import { observer } from 'mobx-react-lite';
import Button from '@components/ui/Button';
import JoinCodeDisplay from '@components/ui/JoinCodeDisplay';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerList from '@components/features/PlayerList';
import Prompt from '@components/ui/Prompt';
import { useHost } from '@contexts/HostContext';
import { GamePhase } from '@store/common/common.types';
import { Root, Sidebar, Content } from './HostGame.styles';

const ClientContent: React.FC = observer(() => {
    const host = useHost();

    const handleStartGame = () => {
        host.startGame();
    };

    switch (host.gameState.gamePhase) {
        case GamePhase.Lobby: {
            return (
                <>
                    <JoinCodeDisplay url={location.host} joinCode={host.gameState.joinCode} />
                    <Button disabled={host.gameState.players.length === 0} onClick={handleStartGame}>
                        Start Game
                    </Button>
                </>
            );
        }
        case GamePhase.Prompt:
        case GamePhase.Submission:
        case GamePhase.Results: {
            const promptState = host.gameState.promptState;
            return promptState && <Prompt {...promptState} />;
        }
        case GamePhase.End: {
            // TODO
            return null;
        }
        default: {
            return null;
        }
    }
});

const ClientGame: React.FC = () => {
    const host = useHost();

    return (
        <Root>
            <Sidebar>
                <PlayerList />
            </Sidebar>
            <Content>
                <ClientContent />
            </Content>
        </Root>
    );
};

export default observer(ClientGame);
