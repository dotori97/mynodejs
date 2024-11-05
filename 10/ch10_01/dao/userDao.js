const models = require(`../models`); // ../models/index.js db => models

//Data Access Object for User
const findAll = async () =>{
    return await models.User.findAll();
    // select * from users
}

module.exports = {
    findAll,
}


