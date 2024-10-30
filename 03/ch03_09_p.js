const fs = require(`fs`);

const result = fs.readFileSync("test.json", `utf-8`);
console.log(result);
const data = JSON.parse(result);
console.log(data[`data`]);
const posts = data[`data`];
posts.forEach((item)=>{
    console.log(item.title, item.content, item[`author`]);
});