import type { Prompt } from '@data/prompts';
import { AvatarImage } from '@store/common/common.types';
import a from './a.png';
import b from './b.png';
import result from './result.png';

const prompt: Prompt = {
    sourceA: { identity: AvatarImage.KerrieM, image: a },
    sourceB: { identity: AvatarImage.Kaylee, image: b },
    result: { image: result },
};

export default prompt;
