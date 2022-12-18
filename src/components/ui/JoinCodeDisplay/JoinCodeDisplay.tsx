import { Root, Row, Url, JoinCode } from './JoinCodeDisplay.styles';

interface LobbyHostProps {
    url: string;
    joinCode: string;
}

const LobbyHost: React.FC<LobbyHostProps> = ({ url, joinCode }) => {
    return (
        <Root>
            <Row>
                Join on your phone at <Url>{url}</Url>
            </Row>
            <Row>with join code</Row>
            <Row>
                <JoinCode>{joinCode}</JoinCode>
            </Row>
        </Root>
    );
};

export default LobbyHost;
