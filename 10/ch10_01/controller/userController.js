const userService = require(`../services/userService`);

const findAll = async (req, res) => {
    try{
        const users = await userService.findAll();
        res.status(200).json({data: users, message: `ok`});
    }catch(e){
        res.status(500).json({message: e});
    }
}

module.exports = {
    findAll, 
}