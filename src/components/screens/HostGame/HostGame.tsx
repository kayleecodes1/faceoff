import { observer } from 'mobx-react-lite';
import JoinCodeDisplay from '@components/ui/JoinCodeDisplay';
import PlayerList from '@components/features/PlayerList';
import RoundDisplay from '@components/features/RoundDisplay';
import Button from '@components/ui/Button';
import WinnerDisplay from '@components/ui/WinnerDisplay';
import { useHost } from '@contexts/HostContext';
import { GamePhase } from '@store/common/common.types';
import { Root, Sidebar, Content } from './HostGame.styles';

const WinnersScreen: React.FC = observer(() => {
    const host = useHost();
    const { winners } = host.gameState;

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: 32 }}>
            {winners.map((winner) => (
                <WinnerDisplay key={winner.name} {...winner} />
            ))}
        </div>
    );
});

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
            return <WinnersScreen />;
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
