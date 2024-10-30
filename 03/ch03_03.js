const fs = require('fs');

//callback 형태 파일읽기
fs.readFile('hello.txt', 'utf-8', (err, data) => { //파일명, 인코딩 형식, 함수(에러, 결과데이터)
    if(err){
        console.log(`errror: ${err}`);
    }
    console.log(`data: ${data}`);
});

console.log("----------")

//sync형태(라인 by 라인) 파일읽기
try{const data = fs.readFileSync(`hello2.txt`, 'utf-8');
        console.log(`readFileSync: ${data}`);
        console.log("-----------");
}catch(e){
    console.error(e);
}

