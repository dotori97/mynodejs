module.exports = (sequelize, DataTypes) => {

    /* 
        create table Posts(
            id integer primary key autoincrement,
            title TEXT not null,
            content text,
            author text
        )    
    */    

    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        content: DataTypes.STRING,
        author: DataTypes.STRING,
        filename: {                   //마이그레이션 실행(?)해도 논리적인 파일은 자동으로 안 바뀜
            type: DataTypes.STRING,   //물리적인 파일은 생성되도
            allowNull:true            //그래서 이 부분 수정해줘야(첨부해줘야)
        }
    });
    Post.associate = function(models){
        Post.hasMany(models.Comment);
    }
    return Post;
};