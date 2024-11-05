const express = require(`express`);
const path = require(`path`);
const models = require(`./models`); //models/index.js <= 이걸 호출함
// models == db
// models.

const multer = require(`multer`); 
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/downloads", express.static(path.join(__dirname, "public/uploads")));
//req => http://localhost:3000/downloads/test.png
//res => public/uploads/test.png

const upload_dir = "public/uploads"; 
const storage = multer.diskStorage({
    destination: `./${upload_dir}`,
    filename: function(req, file, cb){  //cb는 콜백함수를 말함
        cb(null, 
            path.parse(file.originalname).name + //test
            "-" + 
            Date.now() + 
            path.extname(file.originalname)
        )
    }//test.png => test-2024110410101.png
});
const upload = multer({storage: storage}); 


app.post("/posts", upload.single("file"), async (req, res) => {  //업로드 multer를 이용해 생성된 미들웨어 첨부(마이그레이션?) 
    const {title, content, author} = req.body;
    let filename = req.file ? req.file.filename : null;  //test-2024110410101
    filename = `/downloads/${filename}`; //downloads/test-2024110410101
    const post = await models.Post.create({
        title: title,
        content: content,
        author: author,
        filename: filename, 
    });
    res.status(201).json({post:post});
});

app.get("/posts", async(req, res) => {
    const posts = await models.Post.findAll({
        include: [
            {model: models.Comment}
        ]
    });
    res.json({data: posts});
});

app.get("/posts/:id", async(req, res)=>{
    const id = req.params.id;

    const post = await models.Post.findOne({
        where: {id:id}
    });
    if(post){
        res.status(404).json({data: `post not found`});
    }
});

app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const {title, content, author} = req.body;
    const post = await models.Post.findByPk(id);
    if(post){
        post.title = title;
        post.content = content;
        post.author = author; 
        await post.save();
        res.status(200).json({data: post});
    }else{
        res.status(404).json({result: "post not found"});
    }
})

app.delete("/posts/:id", async (req, res) => {
    const result = await models.Post.destroy({
        where: {
            id: req.params.id
        }
    });
    console.log(result);
    if(result){
        res.status(204).send();
    }else{
        res.status(404).json({result: `post not found`});
    }
});

app.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const {content} = req.body;

    //inster into comments(postId, content) values(?, ?)
    const comment = await models.Comment.create({
        PostId: postId,
        content: content, 
    });
    res.status(201).json({data: comment});
});

// comment update
app.put("/posts/:postId/comments/:commentId", async (req, res)=>{
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const {content} = req.body;
    const comment = await models.Comment.findByPk(commentId); //1. comment get
    if(comment){
        comment.content = content;
        await comment.save(); //2. comment update
        res.status(200).json({data: comment});
    }else{
        res.status(404).json({result: "comment not found"});
    }
});

// comment delete
app.delete("/posts/:postId/comments/:commentId", async (req, res)=>{
    const commentId = req.params.commentId;
    // delete from comments where id = commentId
    const result = await models.Comment.destroy({
        where: {id: commentId}
    });
    console.log(`result is ${JSON.stringify(result)}`); //deleted count => result
    if(result) {
        res.status(204).json();
    }else{
        res.status(404).json({result: "comment not found"});
    }
}) 


// npx nodemon app.js
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
    models.sequelize
        .sync({force: false})  //데이터베이스 연결 처리함
        .then(()=>{
            console.log(`DB connected`);
        })
        .catch((err)=>{
            console.log(`DB error: ${err}`);
            process.exit();
        })
})