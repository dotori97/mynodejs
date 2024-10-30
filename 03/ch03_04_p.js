const fs = require(`fs`);

const content = `좋은 아침! 오늘도 신나게 쌩쌩~`;
const content2 = `즐코~~`

fs.writeFile(`out3`, content, (err)=>{
    console.error(err);
});

fs.writeFileSync(`out4.txt`, content2, error=>{
    console.error(error);
});