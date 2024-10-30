const fs = require(`fs`);

const dirname="seoul/nambu/fullstack"
fs.mkdirSync(dirname, {recursive: true});

const content = `서울시에서 운영하는 남부여성발전센터`;

fs.writeFileSync(`${dirname}/out2.txt`, content, `utf-8`);