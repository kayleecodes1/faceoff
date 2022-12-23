import { Prompt } from '@store/common/common.types';

/**
 * Fetch the data for all prompts from the public assets path.
 */
const fetchPrompts = async () => {
    const response = await fetch('/prompts/prompts.json');
    const data = await response.json();
    return data as Prompt[];
};

export default fetchPrompts;
