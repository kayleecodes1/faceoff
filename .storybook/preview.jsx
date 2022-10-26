import StylesProvider from '@styles/StylesProvider';

export const decorators = [
    (Story) => (
        <StylesProvider>
            <Story />
        </StylesProvider>
    ),
];
