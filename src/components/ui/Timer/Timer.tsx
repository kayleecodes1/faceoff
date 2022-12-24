import { Root, Label, ProgressBar, Divider } from './Timer.styles';

export interface TimerProps {
    numDivisions?: number;
    timeElapsed: number;
    timeLimit: number;
    variant?: 'default' | 'warn';
}

const Timer: React.FC<TimerProps> = ({ numDivisions = 1, timeElapsed, timeLimit, variant = 'default' }) => {
    const timeRemaining = timeLimit - timeElapsed;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = Math.floor(timeRemaining % 60);
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

    const progress = Math.max(0, Math.min(1, timeElapsed / timeLimit));

    return (
        <Root>
            <Label variant={variant}>{formattedTime}</Label>
            <ProgressBar progress={progress}>
                {numDivisions > 1 &&
                    Array(numDivisions - 1)
                        .fill(null)
                        .map((_, index) => (
                            <Divider key={index} style={{ left: `${((index + 1) / numDivisions) * 100}%` }} />
                        ))}
            </ProgressBar>
        </Root>
    );
};

export default Timer;
