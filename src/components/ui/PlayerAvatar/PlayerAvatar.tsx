import avatarNone from '@assets/avatars/avatar_none.png';
import avatarBeryl from '@assets/avatars/avatar_beryl.png';
import avatarBetsy from '@assets/avatars/avatar_betsy.png';
import avatarBrian from '@assets/avatars/avatar_brian.png';
import avatarCelia from '@assets/avatars/avatar_celia.png';
import avatarJamie from '@assets/avatars/avatar_jamie.png';
import avatarJarrett from '@assets/avatars/avatar_jarrett.png';
import avatarJerry from '@assets/avatars/avatar_jerry.png';
import avatarKatie from '@assets/avatars/avatar_katie.png';
import avatarKaylee from '@assets/avatars/avatar_kaylee.png';
import avatarKelsey from '@assets/avatars/avatar_kelsey.png';
import avatarKerrieG from '@assets/avatars/avatar_kerrie-g.png';
import avatarKerrieM from '@assets/avatars/avatar_kerrie-m.png';
import avatarRyan from '@assets/avatars/avatar_ryan.png';
import avatarSpencer from '@assets/avatars/avatar_spencer.png';
import { Root, Image } from './PlayerAvatar.styles';

export enum AvatarImage {
    None,
    Beryl,
    Betsy,
    Brian,
    Celia,
    Jamie,
    Jarrett,
    Jerry,
    Katie,
    Kaylee,
    Kelsey,
    KerrieG,
    KerrieM,
    Ryan,
    Spencer,
}

const avatarImages: Record<AvatarImage, string> = {
    [AvatarImage.None]: avatarNone,
    [AvatarImage.Beryl]: avatarBeryl,
    [AvatarImage.Betsy]: avatarBetsy,
    [AvatarImage.Brian]: avatarBrian,
    [AvatarImage.Celia]: avatarCelia,
    [AvatarImage.Jamie]: avatarJamie,
    [AvatarImage.Jarrett]: avatarJarrett,
    [AvatarImage.Jerry]: avatarJerry,
    [AvatarImage.Katie]: avatarKatie,
    [AvatarImage.Kaylee]: avatarKaylee,
    [AvatarImage.Kelsey]: avatarKelsey,
    [AvatarImage.KerrieG]: avatarKerrieG,
    [AvatarImage.KerrieM]: avatarKerrieM,
    [AvatarImage.Ryan]: avatarRyan,
    [AvatarImage.Spencer]: avatarSpencer,
};

interface PlayerAvatarProps {
    background?: 'default' | 'highlight';
    image?: AvatarImage;
    size?: number;
}

interface PlayerAvatarAdditionalProperties {
    AvatarImage: typeof AvatarImage;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> &
    PlayerAvatarAdditionalProperties = ({
    background = 'default',
    image = AvatarImage.None,
    size = 48,
}) => {
    return (
        <Root background={background} size={size}>
            <Image src={avatarImages[image]} />
        </Root>
    );
};

PlayerAvatar.AvatarImage = AvatarImage;

export default PlayerAvatar;