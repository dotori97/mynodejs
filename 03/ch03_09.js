const fs = require('fs');

const result = fs.readFileSync("test.json", 'utf-8');
console.log(result);  //문자열이 찍혀서 나옴
const data = JSON.parse(result);
console.log(data[`data`]); //객체가 찍혀서 나옴
const posts = data["data"]; //array
posts.forEach(item => {
    console.log(item.title, item.content, item[`author`]);
});