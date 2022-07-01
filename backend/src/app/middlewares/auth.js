const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({error: true, code:'token.invalid', message: 'Token not present'});
    
    //Bearer hash loucobsijcjsa

    const [scheme, token] = authHeader.split(' ');

    if (!token) {
        return response 
          .status(401)
          .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: true, code: 'token.invalid', message:'Token malformatted'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({error:true, code: 'token.expired', message:'Token invalid'});
        req.user = decoded.sub;
        return next();
    })
}