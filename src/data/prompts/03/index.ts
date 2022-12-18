import { AvatarImage } from '@components/ui/PlayerAvatar';
import type { Prompt } from '@data/prompts';
import a from './a.png';
import b from './b.png';
import result from './result.png';

const prompt: Prompt = {
    sourceA: { identity: AvatarImage.Jarrett, image: a },
    sourceB: { identity: AvatarImage.Brian, image: b },
    result: { image: result },
};

export default prompt;
