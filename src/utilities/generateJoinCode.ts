export const JOIN_CODE_CHARACTERS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
export const JOIN_CODE_LENGTH = 6;

const joinCodeGenerator = function* (): Generator<string> {
    for (let i = 0; i < JOIN_CODE_LENGTH; i++) {
        yield JOIN_CODE_CHARACTERS[Math.floor(Math.random() * JOIN_CODE_CHARACTERS.length)];
    }
};

const generateJoinCode = (): string => {
    return Array.from(joinCodeGenerator()).join('');
};

export default generateJoinCode;
