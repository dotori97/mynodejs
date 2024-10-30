let personInfo = {
    name: 'lee',
    age: 55, 
    adress: '서울 금천구 독산동 123',
    hobby: ['독서', '등산', '낚시', '넷플릭스']
}

for(let key in personInfo){
    console.log(`${key} => ${personInfo[key]}`)
}

console.log('==========');
console.log(`key list: 
    ${Object.keys(personInfo)}`); //key list:
                                  //name,age,adress,hobby

console.log(`key list type: 
    ${typeof(Object.keys(personInfo))}`);


console.log(personInfo[`test`]);

Object.keys(personInfo).forEach(key=> {
    console.log(`${key} => ${personInfo[key]}`)
})    

const keys = Object.keys(personInfo)
console.log(keys.includes('test'));

// console.log(personInfo ['test']['a']) //error
if(keys.includes('test')){   // keys list
    console.log(personInfo['test']['a']); //not error
}