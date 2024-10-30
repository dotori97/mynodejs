const fs = require(`fs`);
const path = require(`path`);

//__의 의미: 현재 디덱터리까지를 가져옴
const newFilePath = path.join(__dirname, `a3`, `b3`, `c3`, `d3.txt`);
console.log(newFilePath);
console.log(path.parse(newFilePath).dir);
console.log(path.parse(newFilePath).base);

const makeFile = (fpath, content) => {
    const filename = path.parse(fpath).base; //end가 file이라고 가정
    if(filename.includes(".")){
        const dirname = path.parse(fpath).dir;
        fs.mkdirSync(dirname, {recursive: true});
        fs.writeFileSync(fpath, content);
    }
}

makeFile(newFilePath, '새로운 파일이 생성되었습니다.');