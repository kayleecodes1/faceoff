import { observer } from 'mobx-react-lite';
import Button from '@components/ui/Button';
import JoinCodeDisplay from '@components/ui/JoinCodeDisplay';
import PlayerList from '@components/features/PlayerList';
import RoundDisplay from '@components/features/RoundDisplay';
import { useHost } from '@contexts/HostContext';
import { GamePhase } from '@store/common/common.types';
import { Root, Sidebar, Content } from './HostGame.styles';

const HostContent: React.FC = observer(() => {
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
            return <RoundDisplay />;
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

const HostGame: React.FC = () => {
    return (
        <Root>
            <Sidebar>
                <PlayerList />
            </Sidebar>
            <Content>
                <HostContent />
            </Content>
        </Root>
    );
};

export default observer(HostGame);
