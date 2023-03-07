const obj = {
  length: 1,
  1: 'apple',
  [Symbol.isConcatSpreadable]: true
};

const arr = ['banana', 'pear'];
const result = arr.concat(obj);

console.log(result, result.length); // 4