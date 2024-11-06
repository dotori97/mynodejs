const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {  // access token
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, `access`, {expiresIn: '14d'});  // 14d는 14일을 말함. 원래는 15m(15분) 정도를 줘야. 
}

const generateRefreshToken = (user) => {  // refresh token
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, `refresh`, {expiresIn: '14d'});  // 14d는 14일을 말함. 원래는 15m(15분) 정도를 줘야. 
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}