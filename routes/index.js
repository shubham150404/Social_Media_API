require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User')
const Post = require('../model/Post')
const Comment = require('../model/Comment')
var jwt = require('jsonwebtoken');
const Usercontroller = require('../controller/UserController')
const PostController = require('../controller/PostController')
const CommentController = require('../controller/CommentController')


/* User */
router.post('/UserCreate',Usercontroller.User_create);

router.get('/UserGet',Usercontroller.User_sequre,Usercontroller.User_get);

router.put('/UserUpdate/:id',Usercontroller.User_sequre,Usercontroller.User_Update);

router.delete('/UserDelete/:id',Usercontroller.User_sequre,Usercontroller.User_Delete);

// post
router.post('/PostCreate',PostController.Post_create);

router.get('/PostrGet',PostController.Post_sequre,PostController.Post_get);

router.put('/PostUpdate/:id',PostController.Post_sequre,PostController.Post_Update);

router.delete('/PostDelete/:id',PostController.Post_sequre,PostController.Post_Delete);


// Comment
router.post('/CommentCreate',CommentController.Comment_create);

router.get('/BookGet',CommentController.Comment_sequre,CommentController.Comment_get);
// router.get('/CommentGet',CommentController.Comment_get);

router.put('/CommentUpdate/:id',CommentController.Comment_sequre,CommentController.Comment_Update);

router.delete('/CommentDelete/:id',CommentController.Comment_sequre,CommentController.Comment_Delete);


module.exports = router;
