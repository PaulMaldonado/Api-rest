const jwt = require('jsonwebtoken');

// Método para validar token del Usuario
const verifyTokenUser = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) {
        return res.status(401).json({
            error: 'Acceso denegado'
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifiedToken
        
        next()
    } catch (error) {
        res.status(400).json({
            error: 'El token no es valido!!'
        })
    }
};

module.exports = verifyTokenUser;