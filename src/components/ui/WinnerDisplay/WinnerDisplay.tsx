import PlayerAvatar from '@components/ui/PlayerAvatar';
import { AvatarImage } from '@store/common/common.types';
import { Root, AvatarContainer, Placement, Label } from './WinnerDisplay.styles';

interface WinnerDisplayProps {
    avatarImage: AvatarImage;
    name: string;
    placement: 1 | 2 | 3;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ avatarImage, name, placement }) => {
    return (
        <Root placement={placement}>
            <AvatarContainer>
                <PlayerAvatar
                    background="highlight"
                    image={avatarImage}
                    size={placement === 1 ? 256 : placement === 2 ? 200 : 150}
                />
                <Placement>
                    <strong>{placement}</strong>
                    <span>{placement === 1 ? 'st' : placement === 2 ? 'nd' : 'rd'}</span>
                </Placement>
            </AvatarContainer>
            <Label size={placement === 1 ? 'large' : placement === 2 ? 'medium' : 'small'}>{name}</Label>
        </Root>
    );
};

export default WinnerDisplay;
