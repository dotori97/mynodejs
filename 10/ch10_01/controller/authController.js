const bcrypt = require(`bcryptjs`);  //bcryptjs는 단방향 암호화 설정
const {generateAccessToken, generateRefreshToken} = require(`../utils/token`);
const userService = require(`../services/userService`);

//회원가입(sign up)
const register = async (req, res) => {
    const {email, name, password} = req.body;
    //bcrypt는 비밀번호를 안전하게 암호화하기 위해 설계된 해시 알고리즘 라이브러리
    //password: 해싱할 평문 비밀번호. 이 변수에는 사용자가 입력한 실제 비밀번호가 들어감.
    const hashedPassWord = await bcrypt.hash(password, 10);
    try{
        const user = await userService.createUser({
            email: email, name: name, password: hashedPassWord,
        });
        res.status(201).json({message: 'ok', data: user});
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await userService.findUserByEmail(email);
        if(!user){
            return res.status(400).json({message: `Invalid email and password`});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:
                `Invalid email and password`});
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({
            accessToken, refreshToken
        });
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

//이렇게 하면 db검색없이 검증
const jwt = require(`jsonwebtoken`);
const refresh = async (req, res) => {
    const {token} = req.body; //refresh token
    if(!token) return res.sendStatus(401);

    jwt.verify(token, `refresh`, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        res.status(200).json({
            accessToken,
        })
    });
}

module.exports = {
    register, login, 
}


