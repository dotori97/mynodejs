const test = require(`./ch03_01_p`);

console.log(test.circle(5));
console.log(test.mod(9, 2));
console.log(`105%32=${test.mod(105,32)}`);
console.log(`반지름이 36인 원의 넓이는 ${test.circle(36)}`);