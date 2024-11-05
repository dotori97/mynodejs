const userDao = require(`../dao/userDao`);

const findAll = async () =>{
    //complex biz logic
    return await userDao.findAll();
}

module.exports = {
    findAll,
}