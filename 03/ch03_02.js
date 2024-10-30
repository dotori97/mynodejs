//module을 사용할 파일

const calc = require('./ch03_01');
console.log(`2+3= ${calc.add(2,3)}`);

console.log(`10-7= ${calc.subtract(10, 7)}`);

console.log(calc.add(10, 20));
console.log(calc.subtract(20,10));
console.log(calc.subtract(10, 20));
console.log(calc.mul(10, 3));
console.log(calc.div(10, 2));
