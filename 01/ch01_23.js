console.log(`begin`);
setTimeout(()=>{  //첫번째 인자는 함수, 두번째 인자는 시간(정해진 시간만큼 지연 뒤 실행)
    console.log(`1초 뒤에 호출`);
}, 1000)
console.log('end');

setInterval(()=>{ //첫번째 인자는 함수, 두번째 인자는 시간(정해진 시간마다 실행)
    console.log(`1초마다 실행`);
}, 1000)
