import { Root, Label, ProgressBar } from './Timer.styles';

export interface TimerProps {
    timeElapsed: number;
    timeLimit: number;
    variant?: 'default' | 'warn';
}

const Timer: React.FC<TimerProps> = ({
    timeElapsed,
    timeLimit,
    variant = 'default',
}) => {
    const timeRemaining = timeLimit - timeElapsed;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = Math.floor(timeRemaining % 60);
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

    const progress = Math.max(0, Math.min(1, timeElapsed / timeLimit));

    return (
        <Root>
            <Label variant={variant}>{formattedTime}</Label>
            <ProgressBar progress={progress} />
        </Root>
    );
};

export default Timer;
