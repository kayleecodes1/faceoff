/**
 * Wait the given amount of time in milliseconds before resolving.
 */
const wait = async (ms: number): Promise<void> => {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export default wait;
