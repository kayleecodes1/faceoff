import { Root, Dot } from './Typing.styles';

interface TypingProps {
    size?: number;
}

const Typing: React.FC<TypingProps> = ({ size = 48 }) => {
    return (
        <Root size={size} viewBox="0 0 24 24">
            <Dot position={1} cx="4" cy="12" />
            <Dot position={2} cx="12" cy="12" />
            <Dot position={3} cx="20" cy="12" />
        </Root>
    );
};

export default Typing;
