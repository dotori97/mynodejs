const express = require(`express`);
const path = require(`path`);
const models = require(`./models`); //models/index.js <= 이걸 호출함
// models == db
// models.

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/posts", async (req, res) => {
    const {title, content, author} = req.body;
    const post = await models.Post.create({
        title: title,
        content: content,
        author: author,
    });
    res.status(201).json({post:post});
});

app.get("/posts", async(req, res) => {
    const posts = await models.Post.findAll();
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