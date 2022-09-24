import jwt from 'jsonwebtoken'
import { createError } from './error.js'

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) {
        return next(createError(401,"You are not authenticated user!"))
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,decodedUser) => {
        if(err) {
            return next(createError(403,"Token is not valid!"))
        }
        req.decodedUser = decodedUser;
        next();
    })
}

module.exports = verifyToken;