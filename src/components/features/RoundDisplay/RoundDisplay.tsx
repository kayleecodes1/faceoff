import { observer } from 'mobx-react-lite';
import Timer from '@components/features/Timer';
import Prompt from '@components/ui/Prompt';
import { useHost } from '@contexts/HostContext';
import { Root, RoundLabel } from './RoundDisplay.styles';

const RoundDisplay: React.FC = () => {
    const host = useHost();
    const { roundState, promptState, timerState } = host.gameState;
    return (
        <Root>
            <RoundLabel>
                Round {roundState.currentRound} / {roundState.totalRounds}
            </RoundLabel>
            {timerState && <Timer {...timerState} />}
            {promptState && <Prompt {...promptState} />}
        </Root>
    );
};

export default observer(RoundDisplay);
