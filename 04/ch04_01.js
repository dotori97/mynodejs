const express = require(`express`);
const fs = require(`fs`);
const app = express();
const PORT = 3000;
//app.use(express.json());

app.get("/", (req, res)=>{  //app.get => GET
    res.send("<h1>Hello Wolrd</h1>");
});

app.get("/write", (req, res) =>{
    const posts = [];
    for(let i=0; i<10; i++){
        posts.push({
            id: i,
            title: `테스트 타이틀 ${i}`,
            content: `테스트 내용 ${i}`,
        });
    }
    fs.writeFileSync("test.json", JSON.stringify({data: posts}));
    res.send("<h1>test.json파일 생성 성공</h1>");
})

app.get("/list", (req, res) => {
    //test.json 에서 파일을 읽어서 
    //json형태로 브라우저에 출력 
    //1. test.json 에서 파일을 읽어서
    const result = fs.readFileSync("test.json", 'utf-8');
    

    //2. 객체를 파싱하고 (author 정보를 추가해서)
    
    const data = JSON.parse(result)["data"]; 
    data.forEach(x => {  // 배열을 돌면서 객체를 추가 또는 삭제
        x["author"] ={
            name: "백길동",
            email: "h2@mail.com"
        }
    });

    //3. 다시 객체를 JSON문자열로 변환

    //const result2 = JSON.stringify({data:data})

    //4.클라이언트에서 반환

    res.status(200).json({data: data}); //res.json을 쓰면 자동으로 객체를 JSON문자열로 반환
    
    //res.send(result2);    
    
});

//http://localhost:3000/view/1
//http://localhost:3000/view/2
//http://localhost:3000/view/3 -> 1,2,3 동적으로
app.get("/view/:postId", (req, res) =>{
    const postId = req.params.postId;
    const data = fs.readFileSync("test.json", "utf-8");
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"]; //array filter 
    const selectedPost = posts.filter(item => {
        return item.id == postId;
    });
    console.log(selectedPost[0]);
    res.json({data: selectedPost[0]});
})

app.listen(PORT, ()=>{
    console.log(`서버가 실행중입니다. ${PORT}에서`);
});



