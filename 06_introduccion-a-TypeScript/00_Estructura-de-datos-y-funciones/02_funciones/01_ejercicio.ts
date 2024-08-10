function findMax(numbers: number[]): number {
    return Math.max(...numbers);
};

const nums: number[] = [20,10,5,4,3,100,1,30];

const maxValue: number = findMax(nums);

console.log(`El mayor valor es: ${maxValue}`);