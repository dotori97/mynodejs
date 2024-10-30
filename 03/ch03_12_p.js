const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    if(path==`/json`){
        res.setHeader(`Content-type`, `application/json`);
        const data = {
            name: `lee`, age:40, address: `서울시 양천구 신정동`
        }
        const result = JSON.stringify(data);
        res.end(result);      
    }else if(path==`/test`){
        res.setHeader( `Content-Type`, `application/json`);
        const data = fs.readFileSync("test2.json",'utf-8');
        const result = JSON.parse(data);

        console.log(result);
        const posts = result[`data`];

        res.end(JSON.stringify({
            data: posts
        }));
    }     
}).listen(4500);


// res.end는 응답의 끝을 알리고, 클라이언트에게 데이터를 실제로 전송하는 메서드입니다. 
// 이 메서드를 호출하면 서버가 클라이언트에게 응답을 완료했음을 알리고 연결을 종료합니다. 
// res.end의 인자로 내용을 전달하면 마지막 내용을 응답에 추가할 수 있습니다.

// res.end(JSON.stringify({ message: "Goodbye" }));
// 위와 같이 작성하면 res.write 없이도 res.end만으로 
// 데이터를 응답 본문에 추가하고 응답을 종료할 수 있습니다.