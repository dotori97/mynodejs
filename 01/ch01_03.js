let pi;
console.log(pi); //undefined
pi=3.14;
console.log(pi); // 3.14

const PI = 3.141592;
console.log(PI);
//PI = 2.78; //상수는 재할당 불가

console.log(23+45);
console.log('this is "string"'); // this is "string"
console.log("this is \"string\""); // this is "string"

console.log(`52+45=${52+45}`);  //탬플릿 문자열

console.log("Hello " + "javascript"); 
console.log("hello \nworld"); //줄바꿈
console.log("hello \tworld"); //탭 사용
console.log("hello \\world"); //이스케이프 문자(\)

console.log(52>52); //false
console.log(52>=52); //true
console.log(45==52); //false
console.log(45!=52); //true

console.log(52 >= 52 && 52 > 52); //false
console.log(52>=52 || 52>52); //true

