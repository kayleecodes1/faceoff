import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';
import Prompt from '@components/features/Prompt';
import PromptContext from '@contexts/PromptContext';
import prompt from '@data/prompts/01';

const wait = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration));

const runTimer = async () => {
    // TODO requestAnimationFrame
};

const useMockContextValue = () => {
    const [showResult, setShowResult] = useState(false);
    const [showSourceA, setShowSourceA] = useState(false);
    const [showSourceB, setShowSourceB] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerVariant, setTimerVariant] = useState<'default' | 'warn'>(
        'default',
    );

    useEffect(() => {
        (async () => {
            await wait(1000);
            setShowResult(true);
            await wait(4000);
            setShowTimer(true);

            // TODO start ticking .... ? probably want a requestAnimationFrame here...

            await wait(2000);
            setShowTimer(false);
            await wait(2000);
            setShowSourceA(true);
            await wait(2000);
            setShowSourceB(true);
        })();
    }, []);

    return {
        prompt: {
            prompt,
            showResult,
            showSourceA,
            showSourceB,
        },
        showTimer,
        timer: {
            timeElapsed,
            timeLimit: 60,
            variant: timerVariant,
        },
    };
};

const Main: ComponentStory<typeof Prompt> = () => {
    const value = useMockContextValue();

    return (
        <PromptContext.Provider value={value}>
            <Prompt />
        </PromptContext.Provider>
    );
};
export { Main as Prompt };

export default {
    title: 'Features/Prompt',
    component: Prompt,
} as ComponentMeta<typeof Prompt>;
