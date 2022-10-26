import { Root, Line } from './X.styles';

interface XProps {
    isAnimated?: boolean;
    size?: number;
}

const X: React.FC<XProps> = ({ isAnimated = false, size = 48 }) => {
    return (
        <Root size={size} viewBox="0 0 52 52">
            <Line d="M 14,14 L 38,38" isAnimated={isAnimated} position={1} />
            <Line d="M 38,14 L 14,38" isAnimated={isAnimated} position={2} />
        </Root>
    );
};

export default X;
