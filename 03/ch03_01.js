const add=(a, b) => {
    return a + b;
}

const subtract=(a, b) => {
    return a - b;
}

const mul=(a, b) => {
    return a * b;
}

const div=(a, b) => {
    return a / b; 
}

module.exports.div= div;
module.exports.mul = mul;
module.exports.subtract = subtract;
module.exports.add = add;