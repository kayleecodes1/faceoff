import PlayerAvatar, { AvatarImage } from '@components/ui/PlayerAvatar';
import { Root, Item, Button } from './AvatarSelect.styles';

interface AvatarSelectProps {
    disabledValues?: Set<AvatarImage>;
    onChange?: (value: AvatarImage) => void;
    size?: number;
    value?: AvatarImage;
}

const avatarImages = Object.values(AvatarImage).filter(
    (a) => !isNaN(Number(a)),
) as AvatarImage[];

const AvatarSelect: React.FC<AvatarSelectProps> = ({
    disabledValues,
    onChange,
    size = 128,
    value,
}) => {
    return (
        <Root size={size}>
            {avatarImages.map((avatarImage) => {
                const isDisabled = disabledValues?.has(avatarImage);
                const isSelected = avatarImage === value;
                return (
                    <Item key={avatarImage}>
                        <Button
                            disabled={isDisabled || isSelected}
                            isDisabled={isDisabled}
                            isSelected={isSelected}
                            onClick={() => onChange?.(avatarImage)}
                        >
                            <PlayerAvatar
                                background={
                                    avatarImage === value
                                        ? 'highlight'
                                        : 'default'
                                }
                                image={avatarImage as any}
                                size={size}
                            />
                        </Button>
                    </Item>
                );
            })}
        </Root>
    );
};

export default AvatarSelect;
