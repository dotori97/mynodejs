const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    //true: query string parsing 할지 말지 여부, 
    //http://localhost:3000/json?name=lee&age=30 (true면 parsing 하고, false면 parsing 안 하고)

    if(path==`/json`){ //http://localhost:4500/json
        res.setHeader(`Content-type`, `application/json`);
        const data = {
            name: 'lee', age:40, address: '서울시 양천구 신정동'
        }
        const result = JSON.stringify(data); //json string
        res.end(result);
    }else if(path == '/test'){
        //http://localhost:4500/test
        //test2.json의 내용을 json 포맷으로 클라이언트 응답을 보내주세요
        res.setHeader(`Content-Type`, `application/json;charset=UTF-8` );
        const data = fs.readFileSync("test2.json", 'utf-8');
        const result = JSON.parse(data);
        
       //console.log(data);
       console.log(result);
        const posts = result['data'];
        
        res.end(JSON.stringify({
            data:posts
        }));
        // res.end(data);
    }
}).listen(4500);