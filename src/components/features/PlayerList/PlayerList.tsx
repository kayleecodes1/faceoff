import { observer } from 'mobx-react-lite';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerListComponent from '@components/ui/PlayerList';
import SubmissionStatus from '@components/ui/SubmissionStatus';
import { Root } from './PlayerList.styles';
import { useHost } from '@contexts/HostContext';

const PlayerList: React.FC = () => {
    const host = useHost();

    return (
        <Root>
            <PlayerListComponent>
                {host.gameState.players.map(({ avatarImage, id, isConnected, name, points, submissionState }) => (
                    <div
                        key={id}
                        style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            alignItems: 'center',
                            gap: 16,
                        }}
                    >
                        <PlayerCard avatarImage={avatarImage} name={name} points={points} />
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
