require('dotenv').config();
const mongoose = require('mongoose');
const Comment = require('../model/Comment')
var jwt = require('jsonwebtoken');


exports.Comment_create = async function (req, res, next) {
  try {
    if (!req.body.user || !req.body.post || !req.body.content) {
      throw new Error("Please Fill the data")
    }
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Comment_data = await Comment.create(req.body)
    const Jwt_Comment = jwt.sign({ id: Comment_data._id }, process.env.SECRET_COMMENT)
    res.status(201).json({
      status: "sucess",
      message: "Comment create",
      data: Comment_data,
      Jwt_Comment
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Comment_get = async function (req, res, next) {
  try {
    const Comment_get = await Comment.find().populate('user').populate('post')
    res.status(201).json({
      status: "sucess",
      message: "Comment Find",
      data: Comment_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Comment_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const Commentupdate = await Comment.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Comment Update",
      data: Commentupdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Comment_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Comment.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Comment Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Comment_sequre = async function (req, res, next) {
  try {
    let Comment_Token = req.headers.authorization
    if (!Comment_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(Comment_Token, process.env.SECRET_COMMENT);
    console.table(Jwt_token)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}