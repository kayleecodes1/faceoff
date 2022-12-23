import shuffle from '@utilities/shuffle';

/**
 * Select a random subset of the given list of the given count and return a new
 * list containing the result.
 */
const selectRandomSubset = <T>(list: T[], count: number): T[] => {
    const shuffled = shuffle(list);
    return shuffled.slice(0, count);
};

export default selectRandomSubset;
