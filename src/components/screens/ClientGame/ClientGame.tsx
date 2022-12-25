import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import AvatarSelect from '@components/ui/AvatarSelect';
import ChangeNameForm from '@components/ui/ChangeNameForm';
import SubmissionForm from '@components/ui/SubmissionForm';
import AvatarResult from '@components/ui/AvatarResult';
import Message from '@components/ui/Message';
import { useClient } from '@contexts/ClientContext';
import { AvatarImage, GamePhase, SubmissionResult } from '@store/common/common.types';
import ordinalSuffix from '@utilities/ordinalSuffix';
import { Root, Container } from './ClientGame.styles';

const ClientLobby: React.FC = observer(() => {
    const client = useClient();

    const handleChangeName = (name: string) => {
        client.updateName(name);
    };

    const handleChangeAvatar = (avatarImage: AvatarImage) => {
        client.updateAvatarImage(avatarImage);
    };

    return (
        <>
            <ChangeNameForm onSubmit={handleChangeName} value={client.gameState.player.name} />
            <AvatarSelect
                disabledValues={client.gameState.disabledAvatars}
                onChange={handleChangeAvatar}
                value={client.gameState.player.avatarImage}
            />
        </>
    );
});

const ClientSubmissionForm: React.FC = observer(() => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const client = useClient();

    const handleSubmit = async (values: { answers: [AvatarImage, AvatarImage] }) => {
        client.submitAnswers(values.answers);
        setIsSubmitted(true);
    };

    return isSubmitted ? <Message>Waiting for other players...</Message> : <SubmissionForm onSubmit={handleSubmit} />;
});

const ClientEndScreen: React.FC = observer(() => {
    const client = useClient();
    const { endPlacement } = client.gameState;

    if (!endPlacement) {
        return null;
    }

    return (
        <Message>
            You ended in <strong>{ordinalSuffix(endPlacement)}</strong> place!
        </Message>
    );
});

const ClientResults: React.FC = observer(() => {
    const client = useClient();

    const { answers, submissionResults } = client.gameState;

    return (
        <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 32, width: 'fit-content', margin: '0 auto' }}>
            <AvatarResult
                avatar={answers?.[0] || AvatarImage.None}
                result={submissionResults?.[0] || SubmissionResult.None}
            />
            <AvatarResult
                avatar={answers?.[1] || AvatarImage.None}
                result={submissionResults?.[1] || SubmissionResult.None}
            />
        </div>
    );
});

const ClientContent: React.FC = observer(() => {
    const client = useClient();

    switch (client.gameState.gamePhase) {
        case GamePhase.Lobby: {
            return <ClientLobby />;
        }
        case GamePhase.Prompt: {
            return <Message>Waiting for prompt...</Message>;
        }
        case GamePhase.Submission: {
            return <ClientSubmissionForm />;
        }
        case GamePhase.Results: {
            return <ClientResults />;
        }
        case GamePhase.End: {
            return <ClientEndScreen />;
        }
    }
});

const ClientGame: React.FC = () => {
    return (
        <Root>
            <Container>
                <ClientContent />
            </Container>
        </Root>
    );
};

export default observer(ClientGame);
