const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-vite',
    },
    features: {
        storyStoreV7: true,
    },
    viteFinal: async (config) => ({
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                '@assets': path.resolve(__dirname, '../src/assets'),
                '@components': path.resolve(__dirname, '../src/components'),
                '@constants': path.resolve(__dirname, '../src/constants'),
                '@contexts': path.resolve(__dirname, '../src/contexts'),
                '@data': path.resolve(__dirname, '../src/data'),
                '@hooks': path.resolve(__dirname, '../src/hooks'),
                '@store': path.resolve(__dirname, '../src/store'),
                '@styles': path.resolve(__dirname, '../src/styles'),
                '@utilities': path.resolve(__dirname, '../src/utilities'),
            },
        },
    }),
};
