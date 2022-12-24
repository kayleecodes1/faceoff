import { useEffect, useState } from 'react';
import UiTimer, { TimerProps as UiTimerProps } from '@components/ui/Timer';

const WARN_DURATION = 10;

const computeTimerProps = (startTime: number, endTime: number, currentTime: number): UiTimerProps => {
    const timeLimit = (endTime - startTime) / 1000;
    const timeElapsed = Math.max(0, Math.min(timeLimit, (currentTime - startTime) / 1000));
    const variant = timeLimit - timeElapsed > WARN_DURATION || timeElapsed === timeLimit ? 'default' : 'warn';
    return { timeElapsed, timeLimit, variant };
};

interface TimerProps {
    startTime: number;
    endTime: number;
}

const Timer: React.FC<TimerProps> = ({ startTime, endTime }) => {
    const [timerProps, setTimerProps] = useState<UiTimerProps>(computeTimerProps(startTime, endTime, Date.now()));

    useEffect(() => {
        let requestId = -1;
        const requestCallback = () => {
            setTimerProps(computeTimerProps(startTime, endTime, Date.now()));
            requestId = requestAnimationFrame(requestCallback);
        };
        requestId = requestAnimationFrame(requestCallback);
        return () => {
            cancelAnimationFrame(requestId);
        };
    }, [startTime, endTime]);

    return <UiTimer numDivisions={3} {...timerProps} />;
};

export default Timer;
