import { observer } from 'mobx-react-lite';
import Button from '@components/ui/Button';
import JoinCodeDisplay from '@components/ui/JoinCodeDisplay';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerList from '@components/ui/PlayerList';
import { useHost } from '@contexts/HostContext';
import { Root, Sidebar, Content } from './HostGame.styles';

const ClientGame: React.FC = () => {
    const host = useHost();
    // TODO
    console.log(host);
    return (
        <Root>
            <Sidebar>
                <PlayerList>
                    {host.gameState.players.map(
                        ({ avatarImage, id, isConnected, name, points }) => (
                            <PlayerCard
                                avatarImage={avatarImage}
                                isConnected={isConnected}
                                key={id}
                                name={name}
                                points={points}
                            />
                        ),
                    )}
                </PlayerList>
            </Sidebar>
            <Content>
                <JoinCodeDisplay
                    url={location.host}
                    joinCode={host.gameState.joinCode}
                />
                <Button disabled={host.gameState.players.length === 0}>
                    Start Game
                </Button>
            </Content>
        </Root>
    );
};

export default observer(ClientGame);
