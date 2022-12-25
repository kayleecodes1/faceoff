/**
 * Apply the corresponding ordinal suffix to the given number and returns the
 * resulting string.
 */
const ordinalSuffix = (n: number): string => {
    const j = n % 10;
    const k = n % 100;
    if (j == 1 && k != 11) {
        return n + 'st';
    }
    if (j == 2 && k != 12) {
        return n + 'nd';
    }
    if (j == 3 && k != 13) {
        return n + 'rd';
    }
    return n + 'th';
};

export default ordinalSuffix;
