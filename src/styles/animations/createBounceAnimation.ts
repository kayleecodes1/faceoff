import { CSSObject, keyframes } from 'styled-components';

const createBounceAnimation = (fn: (t: number) => CSSObject) =>
    keyframes({
        '0%': fn(0),
        '16%': fn(1.3227),
        '28%': fn(0.8688),
        '44%': fn(1.0463),
        '59%': fn(0.9836),
        '73%': fn(1.0058),
        '88%': fn(0.998),
        '100%': fn(1),
    });

export default createBounceAnimation;
