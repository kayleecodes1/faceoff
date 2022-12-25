import { observer } from 'mobx-react-lite';
import { useHost } from '@contexts/HostContext';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerListComponent from '@components/ui/PlayerList';
import SubmissionStatus from '@components/ui/SubmissionStatus';
import { GamePhase } from '@store/common/common.types';
import { Root } from './PlayerList.styles';

const PlayerList: React.FC = () => {
    const host = useHost();

    const doShowPoints = host.gameState.gamePhase !== GamePhase.Lobby;

    return (
        <Root>
            <PlayerListComponent>
                {host.gameState.players.map(({ avatarImage, isConnected, name, points, stableId, submissionState }) => (
                    <div
                        key={stableId}
                        style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            alignItems: 'center',
                            gap: 16,
                            opacity: isConnected ? 1 : 0.7,
                        }}
                    >
                        <PlayerCard avatarImage={avatarImage} name={name} points={doShowPoints ? points : undefined} />
                        {submissionState && (
                            <SubmissionStatus>
                                {submissionState.map((state, index) => (
                                    <SubmissionStatus.Item key={`${index}:${state}`} state={state} />
                                ))}
                            </SubmissionStatus>
                        )}
                    </div>
                ))}
            </PlayerListComponent>
        </Root>
    );
};

export default observer(PlayerList);
