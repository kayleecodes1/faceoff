import { Children } from 'react';
import { Root, Item } from './PlayerList.styles';

interface PlayerListProps {
    children?: React.ReactNode;
}

const PlayerList: React.FC<PlayerListProps> = ({ children }) => {
    return (
        <Root>
            {Children.map(children, (child) => (
                <Item>{child}</Item>
            ))}
        </Root>
    );
};

export default PlayerList;
