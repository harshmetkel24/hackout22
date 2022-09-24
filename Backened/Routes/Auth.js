const express = require('express');
const User = require('../Models/User');
const brcypt = require('bcrypt') // for encryption
const jwt = require('jsonwebtoken')
const createError = require('../utils/error.js')

const secret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', async (req, res, next) => {

    const { mobile, password } = req.body;

    // find user with entered email
    let user = await User.findOne({ mobile:mobile});
    if (!user) {
        return next(createError(404, "User not found!"))
    }
    else {
        // compare both the passwords
        const passCompaare = await brcypt.compare(password, user.password);
        if (!passCompaare) {
            return next(createError(400, "Wrong password or username!"))
        }
        else {
            const data = {
                user: {
                    id: user._id,
                 }
            }
            // send an authorisation token
            const authtoken = jwt.sign(data, secret);
            res.cookie("accessToken",authtoken,{
                httpOnly : true
            }).status(200).json({ success: true });
        }
    }
})


router.post('/signup',  (req, res, next) => {
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        mobile: req.body.mobile
    })

    newUser.save()
    .then((createdUser) => {
        res.status(201).json({success : true})
    }) .catch((err) => {
        next(err)
    })
})

module.exports = router;

