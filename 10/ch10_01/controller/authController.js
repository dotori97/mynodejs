const bcrypt = require(`bcryptjs`);  //bcryptjs는 단방향 암호화 설정
const {generateAccessToken, generateRefreshToken} = require(`../utils/token`);
const userService = require(`../services/userService`);

//회원가입(sign up)
const register = async (req, res) => {
    const {email, name, password} = req.body;
    //bcrypt는 비밀번호를 안전하게 암호화하기 위해 설계된 해시 알고리즘 라이브러리
    //password: 해싱할 평문 비밀번호. 이 변수에는 사용자가 입력한 실제 비밀번호가 들어감.
    //10: 해싱 작업의 복잡도(혹은 "salt 라운드"라고도 함)를 나타냄. 
    //복잡도가 높을수록 해시 과정이 더 오래 걸리지만, 보안은 더 강화. 보통 10에서 12 사이의 값을 많이 사용.
    //bcrypt.hash()는 비동기 함수이므로 해싱이 완료될 때까지 기다리기 위해 await을 사용. 
    //이를 통해 bcrypt.hash() 함수의 결과가 완료되면 hashedPassword 변수에 할당.
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
    register, login, refresh
}


