let personInfo = {
    name: 'lee',
    age: 55, 
    adress: '서울 금천구 독산동 123',
    hobby: ['독서', '등산', '낚시', '넷플릭스']
}

console.log(personInfo);

//객체에 접근하는 방법
const age = 'age';
console.log(personInfo['name']); // 키를 문자열로
console.log(personInfo['age']);
console.log(personInfo[age]);
console.log(personInfo.name);
console.log('======================');
personInfo['gender'] = 'M' //기존에 없는 키를 추가
console.log(personInfo); 
personInfo['address'] = '서울 양천구 신정동'; //기존 키에 값을 할당하면 수정
console.log(personInfo);

//JSON(JavaScript Object Notation)
console.log(JSON.stringify(personInfo)); // 자바스크립트 객체를 JSON으로 바꿀 수 있음


