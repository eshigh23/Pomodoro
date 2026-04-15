const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies["token"]

        // no user is logged in
        if (!token) {
            req.user = null
            return next()
        }

        let decoded =  jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded:", decoded)
        req.user = decoded  // user _id and username
        next()

        
    } catch (e) {
        return res.status(401).json({ errorMessage: 'Unauthorized'})
    }
}

module.exports = authenticateUser