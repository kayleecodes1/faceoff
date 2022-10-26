import { Root, Line, Dot } from './QuestionMark.styles';

interface QuestionMarkProps {
    isAnimated?: boolean;
    size?: number;
}

const QuestionMark: React.FC<QuestionMarkProps> = ({
    isAnimated = false,
    size = 48,
}) => {
    return (
        <Root size={size} viewBox="0 0 52 52">
            <Line
                d="M17.471,17.038a8.07,8.07,0,1,1,8.07,8.07V29.7"
                isAnimated={isAnimated}
            />
            <Dot cx="25.563" cy="40.469" isAnimated={isAnimated} />
        </Root>
    );
};

export default QuestionMark;
