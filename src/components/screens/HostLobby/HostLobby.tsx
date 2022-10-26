import JoinCodeDisplay from '@components/features/JoinCodeDisplay';
import PlayerCard from '@components/ui/PlayerCard';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import PlayerList from '@components/ui/PlayerList';
import SubmissionStatus from '@components/ui/SubmissionStatus';
import type { SubmissionState } from '@components/ui/SubmissionStatus';
import { Root } from './HostLobby.styles';

const players = [
    {
        avatarImage: AvatarImage.Kaylee,
        id: '1',
        name: 'Kaylee',
        points: 0,
    },
    {
        avatarImage: AvatarImage.KerrieM,
        id: '2',
        name: 'Kerrie',
        points: 8,
    },
    {
        avatarImage: AvatarImage.Katie,
        id: '3',
        name: 'Katie',
        points: 97,
    },
    {
        avatarImage: AvatarImage.Kelsey,
        id: '4',
        name: 'Kelsey',
    },
]; // TODO: get from global state

const HostLobby: React.FC = () => {
    return (
        <Root>
            <JoinCodeDisplay url="faceoff.kayleecodes.dev" joinCode="AE4327" />
            <PlayerList>
                {players.map(({ id, ...props }) => (
                    <PlayerCard key={id} {...props} />
                ))}
            </PlayerList>
        </Root>
    );
};

export default HostLobby;
