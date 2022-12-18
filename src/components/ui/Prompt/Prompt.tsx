import type { Prompt as PromptType } from '@data/prompts';
import {
    Root,
    Row,
    ImageContainer,
    ImageWrapper,
    Image,
    Connection,
} from './Prompt.styles';

interface PromptProps {
    prompt: PromptType;
    showResult?: boolean;
    showSourceA?: boolean;
    showSourceB?: boolean;
}

const Prompt: React.FC<PromptProps> = ({
    prompt,
    showResult = true,
    showSourceA = false,
    showSourceB = false,
}) => {
    const { sourceA, sourceB, result } = prompt;
    return (
        <Root>
            <Row>
                <ImageContainer isShown={showSourceA} size="small">
                    <ImageWrapper>
                        <Image
                            alt={showSourceA ? sourceA.identity : '?'}
                            src={sourceA.image}
                        />
                    </ImageWrapper>
                </ImageContainer>
                <ImageContainer isShown={showSourceB} size="small">
                    <ImageWrapper>
                        <Image
                            alt={showSourceB ? sourceB.identity : '?'}
                            src={sourceB.image}
                        />
                    </ImageWrapper>
                </ImageContainer>
            </Row>
            <Row>
                <Connection isFilled={showSourceA} />
                <Connection isFilled={showSourceB} />
            </Row>
            <ImageContainer isShown={showResult} size="large">
                <ImageWrapper>
                    <Image
                        alt={showResult ? 'Result' : '?'}
                        src={result.image}
                    />
                </ImageWrapper>
            </ImageContainer>
        </Root>
    );
};

export default Prompt;
