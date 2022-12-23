import type { AvatarImage } from '@store/common/common.types';
import prompt01 from './01';
import prompt02 from './02';
import prompt03 from './03';

interface SourceData {
    image: string;
    identity: AvatarImage;
}

export interface Prompt {
    sourceA: SourceData;
    sourceB: SourceData;
    result: {
        image: string;
    };
}

const prompts = [prompt01, prompt02, prompt03];

export default prompts;
