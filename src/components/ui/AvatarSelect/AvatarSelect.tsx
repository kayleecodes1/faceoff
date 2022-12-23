import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';
import PlayerAvatar from '@components/ui/PlayerAvatar';
import { AvatarImage } from '@store/common/common.types';
import { Root, Item, Button } from './AvatarSelect.styles';

interface AvatarSelectProps {
    disabledValues?: Set<AvatarImage>;
    onChange?: (value: AvatarImage) => void;
    value?: AvatarImage;
}

const AvatarSelect: React.FC<AvatarSelectProps> = ({ disabledValues, onChange, value }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.mobile})`,
    });
    const size = isMobile ? 64 : 128;

    return (
        <Root size={size}>
            {Object.values(AvatarImage).map((avatarImage) => {
                const isSelected = avatarImage === value;
                const isDisabled = disabledValues?.has(avatarImage) && !isSelected;
                return (
                    <Item key={avatarImage}>
                        <Button
                            disabled={isDisabled || isSelected}
                            isDisabled={isDisabled}
                            isSelected={isSelected}
                            onClick={() => onChange?.(avatarImage)}
                        >
                            <PlayerAvatar
                                background={avatarImage === value ? 'highlight' : 'default'}
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
