import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useMemo } from 'react';
import PlayerCard from '@components/ui/PlayerCard';
import PlayerList from '@components/ui/PlayerList';

const random = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const Template: ComponentStory<typeof PlayerList> = ({ ...args }) => {
    return <PlayerList {...args} />;
};

const Main = ({
    numPlayers,
    sortSeed,
}: {
    numPlayers: number;
    sortSeed: number;
}) => {
    const players = useMemo(() => {
        return Array(numPlayers)
            .fill(null)
            .map((_, index) => ({
                name: `Player ${index + 1}`,
                points: Math.floor(random(sortSeed + index) * 100),
            }));
    }, [numPlayers, sortSeed]);

    const playersSorted = useMemo(() => {
        return [...players].sort((a, b) => b.points - a.points);
    }, [players]);

    return (
        <Template>
            {playersSorted.map(({ name, points }) => (
                <PlayerCard key={name} name={name} points={points} />
            ))}
        </Template>
    );
};
export { Main as PlayerList };

export default {
    title: 'UI/PlayerList',
    component: PlayerList,
    argTypes: {
        numPlayers: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            defaultValue: 10,
        },
        sortSeed: {
            control: 'number',
            defaultValue: 0,
        },
    },
} as ComponentMeta<typeof PlayerList>;
