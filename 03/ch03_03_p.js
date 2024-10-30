const fs = require(`fs`);

fs.readFile(`hello.txt`, `utf-8`, (error, message)=>{
    if(error){
        console.log(`errror: ${error}`);
    }
    console.log(`data: ${message}`);
})

const data = fs.readFileSync(`hello.txt`, `utf-8`);
    console.log(`readFileSync: ${data}`);

try{
    const mean = fs.readFileSync(`hello2.txt`, `utf-8`);
    console.log(`readFileSync: ${mean}`);    
}catch(err){
    console.error(err);
} 
