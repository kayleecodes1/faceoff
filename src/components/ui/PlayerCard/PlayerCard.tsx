import PlayerAvatar from '@components/ui/PlayerAvatar';
import usePreviousValue from '@hooks/usePreviousValue';
import { AvatarImage } from '@store/common/common.types';
import { Root, AvatarContainer, Name, Points, PointsValue, PointsDelta } from './PlayerCard.styles';

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
    const previousPoints = usePreviousValue(points);
    const deltaPoints = (points || 0) - (previousPoints || 0);

    return (
        <Root isConnected={isConnected}>
            <AvatarContainer>
                <PlayerAvatar image={avatarImage} size={44} />
            </AvatarContainer>
            <Name>{name}</Name>
            {typeof points !== 'undefined' && (
                <Points>
                    <PointsValue key={points}>{points}</PointsValue>
                    {Boolean(deltaPoints) && (
                        <PointsDelta key={`${points}:${deltaPoints}`}>
                            {deltaPoints > 0 ? `+${deltaPoints}` : deltaPoints}
                        </PointsDelta>
                    )}
                </Points>
            )}
        </Root>
    );
};

export default PlayerCard;
