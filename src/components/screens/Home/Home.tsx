import { useCallback } from 'react';
import CreateLobbyForm from '@components/ui/CreateLobbyForm';
import JoinLobbyForm from '@components/ui/JoinLobbyForm';
import useGlobalContext from '@contexts/GlobalContext/useGlobalContext';
import { Root, Container, Divider } from './Home.styles';

const Lobby: React.FC = () => {
    const { clientState, createClient, createHost, hostState } =
        useGlobalContext();

    const handleSubmitJoin = useCallback(
        async ({ joinCode, name }: { joinCode: string; name: string }) => {
            await createClient(joinCode, name);
        },
        [createClient],
    );

    const handleSubmitCreate = useCallback(async () => {
        await createHost();
    }, [createHost]);

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
