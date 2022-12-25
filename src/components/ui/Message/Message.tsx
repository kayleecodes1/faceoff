import { Root } from './Message.styles';

interface MessageProps {
    children?: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ children }) => {
    return <Root>{children} </Root>;
};

export default Message;
