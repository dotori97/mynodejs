//중첩 조건문

const date = new Date();
const hour = date.getHours();

if(hour<11) {
    console.log(`아침`, date, hour);
}else{
    if(hour<15){
        console.log(`점심: 오늘 날짜는${date}이고, 지금 시간은 ${hour} 시`);
    }else{
        console.log('저녁', date, hour);
    }
}

