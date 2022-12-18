import PromptComponent from '@components/ui/Prompt';
import Timer from '@components/ui/Timer';
import { usePromptContext } from '@contexts/PromptContext';
import { Root, TimerContainer } from './Prompt.styles';

const Prompt: React.FC = () => {
    const { prompt, showTimer, timer } = usePromptContext();
    // TODO transition in on mount
    // TODO transition timer
    // TODO timer variant 'warn'
    return (
        <Root>
            <TimerContainer>
                <Timer {...timer} />
            </TimerContainer>
            <PromptComponent {...prompt} />
        </Root>
    );
};

export default Prompt;
