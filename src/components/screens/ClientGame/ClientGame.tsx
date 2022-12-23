import { observer } from 'mobx-react-lite';
import AvatarSelect from '@components/ui/AvatarSelect';
import ChangeNameForm from '@components/ui/ChangeNameForm';
import { useClient } from '@contexts/ClientContext';
import { AvatarImage } from '@store/common/common.types';
import { Root, Container } from './ClientGame.styles';

const ClientGame: React.FC = () => {
    const client = useClient();

    const handleLeave = () => {
        client.leave();
    };

    const handleChangeName = (name: string) => {
        client.updateName(name);
    };

    const handleChangeAvatar = (avatarImage: AvatarImage) => {
        client.updateAvatarImage(avatarImage);
    };

    return (
        <Root>
            <Container>
                <button onClick={handleLeave}>Leave</button>
                <ChangeNameForm onSubmit={handleChangeName} value={client.gameState.player.name} />
                <AvatarSelect
                    disabledValues={client.gameState.disabledAvatars}
                    onChange={handleChangeAvatar}
                    value={client.gameState.player.avatarImage}
                />
            </Container>
        </Root>
    );
};

export default observer(ClientGame);
