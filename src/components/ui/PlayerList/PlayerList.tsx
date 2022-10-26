import { Children } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Root, Item } from './PlayerList.styles';

interface PlayerListProps {
    children?: React.ReactNode;
}

// TODO sort children (with animation) based on points
// TODO give a key to indicate when to perform re-sort

// TODO animate in new players

const PlayerList: React.FC<PlayerListProps> = ({ children }) => {
    return (
        <Root>
            <TransitionGroup component={null}>
                {Children.map(children, (child) => (
                    <Transition timeout={600}>
                        {(state) => <Item state={state}>{child}</Item>}
                    </Transition>
                ))}
            </TransitionGroup>
        </Root>
    );
};

export default PlayerList;
