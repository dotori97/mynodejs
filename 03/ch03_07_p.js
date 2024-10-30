const fs = require(`fs`);
const path = require(`path`);

//path.join을 사용해 newFilePath 변수에 파일의 전체 경로를 만들어 할당
const newFilePath = path.join(__dirname, `apple`, `banana`, 'cat', 'dog.txt');
console.log(newFilePath);
console.log(path.parse(newFilePath).dir);
console.log(path.parse(newFilePath).base);

//npath는 newFilePath를 받아서 파일명과 경로를 처리하고, 
//경로가 없다면 디렉토리를 먼저 생성한 뒤, 파일을 생성
//함수 내부에서는 경로가 존재하지 않을 수 있기 때문에 
//fs.mkdirSync로 디렉토리를 재확인하며, 재귀적으로 경로를 만들어 
//파일이 만들어질 위치가 보장되게 해주는 것
//따라서 makeFile 함수는 경로와 파일을 한꺼번에 만들기 위한 것으로, 
//처음 파일을 생성할 때 사용될 경로가 없을 경우 
//자동으로 경로와 파일을 모두 생성
const makeFile = (npath, content) => {
    const filename = path.parse(npath).base;
    if(filename.includes('.')){
        const dirname= path.parse(npath).dir;
        fs.mkdirSync(dirname, {recursive: true});
        fs.writeFileSync(npath, content);
    }
}

//makeFile 함수에 newFilePath와 파일에 쓰일 내용('새로운 파일이 생성되었습니다.')을 전달하며 호출
makeFile(newFilePath, `새파일 생성!`);