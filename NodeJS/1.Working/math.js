//Modules

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

exports.adds = (a, b) => {
    return add(a, b);
}

exports.subtracts = (a, b) => {
    return subtract(a, b);
}

module.exports = {
  add,
  subtract
};
