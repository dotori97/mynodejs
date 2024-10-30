let personInfo = {
    name: 'lee',
    age: 55, 
    adress: '서울 금천구 독산동 123',
    hobby: ['독서', '등산', '낚시', '넷플릭스'],
    addAge: function() {
        this.age=this.age + 1;
    }
}

console.log(`befor call addAge: ${personInfo.age}`);
personInfo.addAge();
console.log(`after call addAge: ${personInfo.age}`);
personInfo.addAge();
personInfo.addAge();
console.log(personInfo['age']);
