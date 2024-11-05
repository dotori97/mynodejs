const express = require(`express`);
const userController = require('../controller/userController');

const router = express.Router();

router.get("/", userController.findAll); //app.get("/users", (req, res)=> {})

module.exports = router;     