const personInfo = {
    name: 'lee',
    test: {
        b:{
            bb: 'aa-test'
        }
    }, 
    age: 15
}
const keys = Object.keys(personInfo)

if(keys.includes('test')){  
    console.log(personInfo['test']['a']); 
}