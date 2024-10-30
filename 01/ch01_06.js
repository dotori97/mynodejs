console.log(String(52));
console.log(typeof(String(52)));
console.log(52+"");
console.log(typeof(52+""));
console.log(`${52}`);
console.log(typeof(`${52}`));

console.log("45");
console.log(typeof("45"));
console.log(typeof(Number("45")));
console.log(typeof(parseInt("45")));
console.log(typeof(parseFloat("45.12")));

console.log(Number("hello")); //NaN 숫자가 아님
console.log(isNaN(Number("hello"))); //숫자가 아닌지 체크 //true


