import PlayerAvatar, { AvatarImage } from '@components/ui/PlayerAvatar';
import { Root, AvatarContainer, Name, Points } from './PlayerCard.styles';

interface PlayerCardProps {
    avatarImage?: AvatarImage;
    isConnected?: boolean;
    name: string;
    points?: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    avatarImage = AvatarImage.None,
    isConnected = true,
    name,
    points,
}) => {
    return (
        <Root isConnected={isConnected}>
            <AvatarContainer>
                <PlayerAvatar image={avatarImage} size={44} />
            </AvatarContainer>
            <Name>{name}</Name>
            {typeof points !== 'undefined' && (
                <Points key={points}>{points}</Points>
            )}
        </Root>
    );
};

export default PlayerCard;
