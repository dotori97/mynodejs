const express = require(`express`);
const postController = require(`../controller/postController`);
const {check} = require(`express-validator`)
const {authenticate} = require(`../middleware/auth_middleware`);
const router = express.Router();

router.get('/', postController.findAll);
//http://localhost:3000/posts
router.post('/', authenticate, postController.createPost); // auth_middleware.js에 있는 next() --> authenticate 이후부터 실행
router.get('/:id', postController.findPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
