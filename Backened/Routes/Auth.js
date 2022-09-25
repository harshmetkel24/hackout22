const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt') // for encryption
const jwt = require('jsonwebtoken')
const createError = require('../utils/error.js')
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', async (req, res, next) => {

    const { mobile, password } = req.body;

    User.findOne({ mobile: mobile })
        .then((user) => {
            if (!user) {
                return next(createError(404, "User not found!"))
            }

            bcrypt.compare(password, user.password, (err, right) => {
                if (right === false) {
                    return next(createError(400, "Wrong password or username!"))
                }
                const data = {
                    id: user._id,
                    name: user.name
                }
                // send an authorisation token
                const authtoken = jwt.sign(data, secret);
                res.cookie("accessToken", authtoken, {
                    httpOnly: true
                }).status(200).json({ success: true, token: authtoken, user: data });
            })

        }).catch((err) => {
            next(err);
        })
})


router.post('/signup', async (req, res, next) => {

    const { name, mobile, password } = req.body;
    let user = await User.findOne({ mobile: mobile });
    if (user) {
        return next(createError(400, "User already exists"))
    } else {

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            mobile: req.body.mobile
        })

        newUser.save()
            .then((createdUser) => {
                res.status(201).json({ success: true })
            }).catch((err) => {
                next(err)
            })
    }
})

module.exports = router;

