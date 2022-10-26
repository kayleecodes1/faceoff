import { Root } from './Prompt.styles';

interface Foo {
    image: string;
    identity: string;
}

interface PromptProps {
    prompt: {
        sources: [Foo, Foo];
        result: { image: string };
    };
    revealSources?: boolean;
}

const Prompt: React.FC<PromptProps> = ({ prompt, revealSources = false }) => {
    return <Root>Prompt</Root>;
};

export default Prompt;
