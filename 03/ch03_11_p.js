const http = require(`http`);
const url = require(`url`);

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    if(path == "/hello"){
        res.writeHead(200, { 'Content-Type': 'text/html' }); // 응답 헤더 설정
        res.end("<h1>World</h1>"); // 클라이언트에 "<h1>World</h1>" 보내기
        
    }else if(path=="/world"){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Hello</h1>");
    }else if(path=="/"){
        res.end("<h1>Home</h1>");
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        //text/plain은 일반 텍스트 파일이나 문자열을 포함할 때 사용하는 MIME 타입으로
        //포맷이 없는 단순 텍스트(Plain text)
        //text/html: HTML 문서를 나타내며 브라우저는 이를 HTML로 해석해 
        //구조에 따라 렌더링합니다.
        //application/json: JSON 데이터를 나타내며, 클라이언트는 이를 JSON 객체로 해석합니다.
        //image/jpeg 또는 image/png: 이미지 데이터로 해석하고 렌더링합니다.
        res.end("Not Found"); // 없는 경로에 "Not Found" 보내기
    }
}).listen(4500, () => {console.log("Server running on http")});

// req.url은 클라이언트가 요청한 URL의 전체 경로를 의미합니다. 
// 예를 들어, http://localhost:4500/hello?name=John라는 요청이 들어오면 
// req.url은 "/hello?name=John" 값을 가지게 됩니다.
// 여기에는 경로와 함께 쿼리 문자열이 모두 포함되어 있습니다.
// url.parse(req.url, true)는 req.url 문자열을 URL 객체로 변환합니다.
// true 옵션을 사용하면 쿼리 문자열이 파싱되어 { key: value } 형태의 객체로 변환됩니다.
// 이 URL 객체에는 pathname, query, host와 같은 여러 가지 속성이 있습니다.
// URL 객체의 pathname 속성은 요청 URL 중 경로(path) 부분만 반환합니다.
// 예를 들어, URL이 "/hello?name=John"이라면 pathname은 "/hello"가 되고, 
// 쿼리 문자열 "?name=John"은 제외됩니다.

// 예를 들어 http://localhost:4500/hello?name=John로 요청이 들어왔을 때:
// req.url은 "/hello?name=John"이 됩니다.
// url.parse(req.url, true)는 이 URL을 파싱하여 다음과 같은 객체로 만듭니다.

// javascript
// 코드 복사
// {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?name=John',
//   query: { name: 'John' },
//   pathname: '/hello',
//   path: '/hello?name=John',
//   href: '/hello?name=John'
// }
// 이 객체의 pathname 속성을 사용하면 "/hello" 경로만 가져올 수 있어, 
// 이후 if 문에서 /hello에 맞는 응답을 보낼 수 있습니다.