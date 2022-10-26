import { useCallback } from 'react';
import CreateLobbyForm from '@components/features/CreateLobbyForm';
import JoinLobbyForm from '@components/features/JoinLobbyForm';
import LobbyHost from '@components/features/LobbyHost';
import { Root, Container, Divider } from './Home.styles';

const Lobby: React.FC = () => {
    const handleSubmitJoin = useCallback(
        async ({ roomCode, name }: { roomCode: string; name: string }) => {
            console.log('join', roomCode, name); // TODO
            await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        [],
    );

    const handleSubmitCreate = useCallback(async () => {
        console.log('create'); // TODO
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }, []);

    return (
        <Root>
            <Container>
                <JoinLobbyForm onSubmit={handleSubmitJoin} />
                <Divider>or</Divider>
                <CreateLobbyForm onSubmit={handleSubmitCreate} />
            </Container>
            {/*<LobbyHost url="faceoff.kayleecodes.dev" joinCode="A4E76B" />*/}
        </Root>
    );
};

export default Lobby;
