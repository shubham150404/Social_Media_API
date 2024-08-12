require('dotenv').config();
const Post = require('../model/Post')
var jwt = require('jsonwebtoken');


exports.Post_create = async function (req, res, next) {
  try {
    console.log(req.body);
    if (!req.body.user || !req.body.content ) {
      throw new Error("Please Fill the data")
    }
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Post_data = await Post.create(req.body)
    const Jwt_Post = jwt.sign({ id: Post_data._id }, process.env.SECRET_POST)
    res.status(201).json({
      status: "sucess",
      message: "Post create",
      data: Post_data,
      Jwt_Post
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Post_get = async function (req, res, next) {
  try {
    const Post_get = await Post.find().populate('user')
    res.status(201).json({
      status: "sucess",
      message: "Post Find",
      data: Post_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Post_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const PostUpdate = await Post.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Post Update",
      data: PostUpdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Post_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Post.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Post Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Post_sequre = async function (req, res, next) {
  try {
    let Post_Token = req.headers.Postization
    if (!Post_Token) {
      throw new Error("Token not found")
    }
    const Jwt_token = jwt.verify(Post_Token, process.env.SECRET_POST);
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}