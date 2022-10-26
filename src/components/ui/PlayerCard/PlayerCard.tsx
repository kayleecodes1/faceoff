import PlayerAvatar, { AvatarImage } from '@components/ui/PlayerAvatar';
import type { SubmissionStatusProps } from '@components/ui/SubmissionStatus';
import { Root, Card, AvatarContainer, Name, Points } from './PlayerCard.styles';

interface PlayerCardProps {
    avatarImage?: AvatarImage;
    children?:
        | React.ReactElement<SubmissionStatusProps>
        | React.ReactElement<SubmissionStatusProps>[];
    name: string;
    points?: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    avatarImage = AvatarImage.None,
    children,
    name,
    points,
}) => {
    return (
        <Root>
            <Card>
                <AvatarContainer>
                    <PlayerAvatar image={avatarImage} size={44} />
                </AvatarContainer>
                <Name>{name}</Name>
                {!isNaN(points) && <Points key={points}>{points}</Points>}
            </Card>
            {children}
        </Root>
    );
};

export default PlayerCard;
