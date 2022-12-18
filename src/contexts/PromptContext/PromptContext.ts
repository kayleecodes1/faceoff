import { createContext } from 'react';
import type { Prompt } from '@data/prompts';

export interface PromptContextValue {
    prompt: {
        prompt: Prompt;
        showResult: boolean;
        showSourceA: boolean;
        showSourceB: boolean;
    };
    showTimer: boolean;
    timer: {
        timeElapsed: number;
        timeLimit: number;
        variant?: 'default' | 'warn';
    };
}

const HostPromptContext = createContext<PromptContextValue | null>(null);

export default HostPromptContext;
