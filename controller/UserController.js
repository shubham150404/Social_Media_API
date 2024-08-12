require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../model/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.User_create = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw new Error("Please Fill the data")
        }
        const Usernamecheck = await User.findOne({ username: req.body.username })
        if (Usernamecheck) {
            throw new Error("User name already exist")
        }
        const Emailcheck = await User.findOne({ email: req.body.email })
        if (Emailcheck) {
            throw new Error("Email already exist")
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        
        if (!req.body.createdAt) {
            req.body.createdAt = Date.now()
        }
        if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const User_data = await User.create(req.body)
        const Jwt_User = jwt.sign({ id: User_data._id },process.env.SECRET_USER)
        res.status(201).json({
            status: "sucess",
            message: "User create",
            data: User_data,
            Jwt_User
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.User_get = async function (req, res, next) {
    try {
        const User_get = await User.find()
        res.status(201).json({
            status: "sucess",
            message: "User Find",
            data: User_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.User_Update = async function (req, res, next) {
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const User_Update = await User.findByIdAndUpdate(id, req.body)
        res.status(201).json({
            status: "sucess",
            message: "User Update",
            data: User_Update,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.User_Delete = async function (req, res, next) {
    try {
        id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "User Delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.User_sequre = async function (req, res, next) {
    try {
        let User_Token = req.headers.authorization
        if (!User_Token) {
            throw new Error("Token not found")
        }
        const Jwt_token = jwt.verify(User_Token, process.env.SECRET_USER);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}