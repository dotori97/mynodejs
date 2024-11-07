//access token 검증
const jwt = require(`jsonwebtoken`);

const authenticate = (req, res, next) => {
    let token; 
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1]; // Bearer XXXXXX --> XXXXX 가져옴        
    }
    if(!token) return res.sendStatus(401);
//jwt.verify() 함수는 JSON Web Token (JWT)이 유효한지 확인하기 위해 사용. 이 함수는 특정 JWT와 비밀 키를 사용하여 토큰을 검증.
// jwt.verify(token, secret, callback)
// token: 검증할 JWT입니다. 여기서 token 변수는 req.headers.authorization에서 추출된 값으로, 클라이언트가 서버에 보낸 JWT.
// secret: 토큰이 유효한지 검증하는 데 사용할 비밀 키. 여기서는 'access'라는 문자열이 사용되고 있으며, 토큰을 발급할 때도 동일한 비밀 키로 생성되어야.
// callback: 검증 결과를 처리하는 콜백 함수. 이 콜백 함수는 두 개의 매개변수를 받는다: err와 user.
// user: 토큰이 유효할 때, 토큰에 포함된 사용자 정보(페이로드)가 user 객체로 반환.
    jwt.verify(token, 'access', (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user; //id, email
        next();
    });
}

module.exports = {
    authenticate,
}
