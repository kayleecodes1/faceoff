import { useState } from 'react';
import AvatarSelect from '@components/features/AvatarSelect';
import ChangeNameForm from '@components/features/ChangeNameForm';
import { AvatarImage } from '@components/ui/PlayerAvatar';
import { Root, Container } from './PlayerLobby.styles';

const disabledAvatars = new Set([
    AvatarImage.Brian,
    AvatarImage.Jarrett,
    AvatarImage.Kaylee,
]); // TODO get from global state

const PlayerLobby = () => {
    const [name, setName] = useState('Kaylee'); // TODO get from global state
    const [avatar, setAvatar] = useState(AvatarImage.None); // TODO get from global state

    return (
        <Root>
            <Container size="small">
                <ChangeNameForm onSubmit={setName} value={name} />
            </Container>
            <Container>
                <AvatarSelect
                    disabledValues={disabledAvatars}
                    onChange={setAvatar}
                    value={avatar}
                />
            </Container>
        </Root>
    );
};

export default PlayerLobby;
