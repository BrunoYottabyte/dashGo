const { decode } = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: true, code: 'token.invalid', message: 'Token not present.'})
    }

    [, token] = authorization.split(' ');

    if(!token){
        return res.status(401).json({error: true, code: 'token.invalid', message: 'Token not present.'})
    }

    try{
        const decoded = decode(token);
        
        req.user = decoded.sub;
        return next();
    }catch(err){
        return res.status(401).json({error: true, code: 'token.invalid', message: 'Invalid token format.'})
    }
}