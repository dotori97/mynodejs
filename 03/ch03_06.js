//const {exec} = require('child_process');
//{exec: exec}를 생략한 것

const cp = require(`child_process`);

const cmd = 'dir'; //맥은 'ls -la'
cp.exec(cmd, {encoding: `utf8`}, (err, stdout, stderr) => {  //{exec} 방식을 쓸거면 이 행에서 cp 빼고, exec만. 
    if(err){
        console.error(`error발생: ${err}`);
        return;
    }
    console.log(stdout);
})

