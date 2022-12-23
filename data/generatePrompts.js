const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../public');

const NAMES = [
    'Alina',
    'Beryl',
    'Betsy',
    'Brian',
    'Cambria',
    'Celia',
    'Jamie',
    'Jarrett',
    'Jerry',
    'Katie',
    'Kaylee',
    'Kelsey',
    'KerrieG',
    'KerrieM',
    'Ryan',
    'Spencer',
];

const sources = {};
for (const name of NAMES) {
    const filepath = `/prompts/sources/${name}.png`;
    try {
        fs.accessSync(path.join(ROOT_PATH, filepath), fs.F_OK);
    } catch (error) {
        console.warn(`Source missing: '${filepath}'`);
        continue;
    }
    sources[name] = filepath;
}

const prompts = [];
for (let i = 0; i < NAMES.length - 1; i++) {
    for (let j = i + 1; j < NAMES.length; j++) {
        const nameA = NAMES[i];
        const nameB = NAMES[j];
        if (!sources[nameA] || !sources[nameB]) {
            continue;
        }
        const filepath = `/prompts/results/${nameA}_${nameB}.png`;
        try {
            fs.accessSync(path.join(ROOT_PATH, filepath), fs.F_OK);
        } catch (error) {
            console.warn(`Result missing: '${filepath}'`);
            continue;
        }
        prompts.push({
            sourceA: { identity: nameA, image: sources[nameA] },
            sourceB: { identity: nameB, image: sources[nameB] },
            result: { image: filepath },
        });
    }
}

fs.writeFileSync(path.join(__dirname, 'prompts.json'), JSON.stringify(prompts));
