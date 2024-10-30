const express = require(`express`);
const fs = require(`fs`);
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("<h1>Hi</h1>");
});


app.get("/write", (req, res) => {
    const posts =[];
    for(let i=0; i<10; i++){
        posts.push({
            id: i,
            title: `타이틀 ${i}`,
            content: `내용 ${i}`,        
        })
    }
    fs.writeFileSync("test1.json", JSON.stringify({data: posts}));
    res.end("<h1>파일 생성 성공</h1>")
})

app.get("/list", (req, res) => {
    const result = fs.readFileSync("test1.json", 'utf-8');
    const data = JSON.parse(result).data;
    data.forEach(x=>{
        x.author = {
            name: "손길동",
            email: "son@mail.com"
        }
    });
    res.status(200).json({data: data});
})

app.get("/view/:postId", (req, res) => {  //:이후의 것을 변수로 취급
    const postId = req.params.postId;
    const data = fs.readFileSync("test1.json", "utf-8");
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"];
    const selectedPost = posts.filter(item => {
        return item.id == postId;
    });
    console.log(selectedPost[0]);
    res.json({data: selectedPost[0]});  //ctrl + click 하면 내용 볼 수 있음
})

app.listen(PORT, ()=>{
    console.log(`서버 실행중 ${PORT}에서`);
})