
const jwt = require('jsonwebtoken');

function auth (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(400).send('token not available');

    try{
        const decode = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decode;
        next();
    }
    catch(err){
        res.status(400).send('token invalid')
    }
}

module.exports = auth