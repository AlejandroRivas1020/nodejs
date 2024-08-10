"use strict";
function findMax(numbers) {
    return Math.max(...numbers);
}
;
const nums = [20, 10, 5, 4, 3, 100, 1, 30];
const maxValue = findMax(nums);
console.log(`El mayor valor es: ${maxValue}`);
