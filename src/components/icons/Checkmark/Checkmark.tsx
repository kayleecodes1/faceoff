import { Root, Check } from './Checkmark.styles';

interface CheckmarkProps {
    isAnimated?: boolean;
    size?: number;
}

const Checkmark: React.FC<CheckmarkProps> = ({
    isAnimated = false,
    size = 48,
}) => {
    return (
        <Root size={size} viewBox="0 0 52 52">
            <Check
                d="M 14.1,27.2 L 21.2,34.4 L 37.9,17.6"
                isAnimated={isAnimated}
            />
        </Root>
    );
};

export default Checkmark;
