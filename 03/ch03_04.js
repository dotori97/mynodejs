const fs = require('fs');

const content = '가을이네요. 볕이 참 좋아요. 아침에는 꽤 쌀쌀하니 감기 조심하세요';

//1.파일명, 2:내용, 인코딩형식 [utf-8]은 안 써도 됨, 3:에러 콜백함수 
fs.writeFile('out.txt', content, 'utf-8', (err) => {
    console.error(err);
});

fs.writeFileSync('out2.txt', content, 'utf-8');

