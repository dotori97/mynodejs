const {Sequelize, Model, DataTypes} =require('sequelize'); 
const sequelize = new Sequelize({ //new Sequelize 객체 생성
    dialect: `sqlite`,            // Sqlite3 use
    storage: `post.db`            // data file name
});

`
    create table User(
        username varchar(100) not null,
        email varchar(100)
    );
`

//위 형식의 모델 만들기 
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});

//즉시 실행 비동기 함수 
(async () => {
    //await를 사용하기 위해서 즉시 실행 함수를 정의합니다.
    //실제 모델을 생성, 데이터를 가져오는 연습은 여기에서 합니다. 
    await sequelize.sync({force: false});
    //여기까지 작성하고 실행하면 post.db 생성     

    //bulkCreate([{},{}])
    // const user1 = await User.create({
    //     username: `user01`,
    //     email: `user01@naver.com`
    // });
    // console.log(`user created => ${JSON.stringify(user1)}`);

    // const users = await User.bulkCreate([
    //     {
    //         username: `user02`, email: `user02@email.com`
    //     },
    //     {
    //         username: `user03`, email: `user03@email.com`
    //     },
    //     {
    //         username: `user04`, email: `user03@email.com`
    //     },
    // ]);
    // console.log(users);

    // const users = await User.findAll(); //select * from Users;
    // users.forEach(user => {
    //     console.log(`username: ${user.username}, email: ${user.email}, id: ${user.id}, createdAt: ${user.createdAt}, updatedAt: ${user.updatedAt}`);
    // });

    
    await User.update({
        email: `user02@naver.com`
    }, {
        where: {
            username: `user02`
        }
    });

    const user = await User.findOne({
        where: {
            username: `user02`
        }
    });
    console.log(`user02 => ${JSON.stringify(user)}`); 

    // delete from Users where username = `user01`;
    r = await User.destroy({
        where: {
            username: `user01`
        }
    });     
    console.log(r);
})();
