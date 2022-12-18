import { observer } from 'mobx-react-lite';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerListComponent from '@components/ui/PlayerList';
import SubmissionStatus from '@components/ui/SubmissionStatus';
import { usePlayersContext } from '@contexts/PlayersContext';
import { Root } from './PlayerList.styles';

const PlayerList: React.FC = () => {
    const { players } = usePlayersContext();

    return (
        <Root>
            <PlayerListComponent>
                {players.map(
                    ({ avatarImage, id, name, points, submissionState }) => (
                        <div
                            key={id}
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                alignItems: 'center',
                                gap: 16,
                            }}
                        >
                            <PlayerCard
                                avatarImage={avatarImage}
                                name={name}
                                points={points}
                            />
                            {submissionState && (
                                <SubmissionStatus>
                                    {submissionState.map((state, index) => (
                                        <SubmissionStatus.Item
                                            key={`${index}:${state}`}
                                            state={state}
                                        />
                                    ))}
                                </SubmissionStatus>
                            )}
                        </div>
                    ),
                )}
            </PlayerListComponent>
        </Root>
    );
};

export default observer(PlayerList);
