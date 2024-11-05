module.exports = (sequelize, DataTypes) => {
//index.js의 
//.forEach(file => {
//    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//    db[model.name] = model;
//  });
//이 구문과 연관 

    //create table users(
    //   id integer primary key autoincrement,
    //   email varchar
    //   password varchar
    //   name varchar
    //   address varchar  

    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,  // 값을 안 정해주면 기본으로 varchar 255
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING,        
    }, {
        tablename: "users"
    });
    return User;
}