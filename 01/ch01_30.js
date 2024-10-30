const fetchData = () => {
    return new Promise((resolve, reject) => {
        //fetch from remote if success true, else false
        setTimeout(()=>{
            const success = true;
            const data = {
                name: 'lee', age: 15
            }
            const error = {
                message: 'error 505'
            }
            if(success){
                resolve(data);
            }else{
                reject(error);
            }
        }, 2000);
    });
}

async function getData(){  //async는 비동기함수라는 것을 알림
    try{
        const data = await fetchData() ; // await는 then과 같다고 보면 됨. resolve 될 때까지 기다려라
        console.log(`fechData result => ${data}`);
        console.log(`fechData result => ${JSON.stringify(data)}`); //json 객체로 출력
        console.log(`fechData result =>`, data); //
    }catch(e){
        console.log(e);
    }
}

getData();