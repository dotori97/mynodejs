const express = require(`express`);
const mongoose = require(`mongoose`);
mongoose.connect("mongodb://localhost/post"); //connect mongodb
const db = mongoose.connection; // get connection object
db.on("error", (err) => { // error 발생했을 떄. 이벤트가 발생할 때마다 반복적으로 리스너를 호출. 따라서 여러 번 실행될 수 있음.
    console.error(`db connect fail: ${JSON.stringify(err)}`);
});

db.once("open", ()=> { //연결이 성공했을 때. 이벤트가 발생해 리스너가 한 번 호출된 후 자동으로 제거. 이벤트가 한 번만 발생하도록 설정할 때 사용됨. 
    console.log(`db connect success`);
});

//define Schma
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: {type: Date, default: Date.now},
});

const Post = mongoose.model(`Post`, PostSchema); //create collection, create table

const app = express();
app.use(express.json());

app.post("/posts", async (req, res)=>{
    const {title, content, author} = req.body; //get content title frome body
    try{
        const post = new Post({  //create post object
            title: title,
            content: content,
            author: author,            
        })
        await post.save(); // save mongodb
        res.status(200).json({data: post, message:`ok`}); //return result to user 
    }catch(e){
        res.status(500).json({message:e});
    }
})

//post list find
app.get("/posts", async (req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json({data: posts, message: "ok"});
    }catch(e){
        res.status(500).json({message: e});
    }
});

app.get("/posts/:id", async (req, res)=> {
    const {id} = req.params;  
    try{
        const post = await Post.findById(id); // 여기서 아이디는 몽고db에서 부여한 아이디 
        res.status(200).json({data: post, message: 'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
})

app.put("/posts/:id", async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body; // json
    try{
        const post = await Post.findByIdAndUpdate(
            id, 
            {
                title: title,
                content: content,
            },
            {new: true} //업데이트가 적용된 후의 문서를 반환
        )
        res.status(200).json({data: post, message: 'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
});

app.delete("/posts/:id", async(req, res)=>{
    const {id} = req.params;
    try{
        await Post.findByIdAndDelete(id);
        res.status(204).send();
    }catch(e){
        res.status(500).json({message:e});
    }
});

app.listen(3000, ()=>{
    console.log (`server is running`);
})
