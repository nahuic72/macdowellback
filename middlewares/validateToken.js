const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
   const token = req.header("authorization")
    
    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        const authorizedToken = jwt.verify(token, process.env.SECRET)
        req.user = authorizedToken
        
        next()
    } catch (error) {
        res.status(400).json({error: 'invalid token'})
    }
}
module.exports = validateToken;