/**
 * Finds two numbers in the array that add up to the target sum.
 *
 * @param {number[]} nums - An array of integers.
 * @param {number} target - The target sum.
 * @returns {number[] | null} An array containing the indices of the two numbers that add up to the target sum, or null if no such pair exists.
 *
 * @example
 * const nums = [2, 7, 11, 15];
 * const target = 9;
 * twoSum(nums, target);  // returns [0, 1]
 */
export function twoSum(nums: number[], target: number): number[] | null {
    const complementMap = nums.reduce((map, num, idx) => {
        map.set(num, idx);
        return map;
    }, new Map<number, number>());
    for (let i = 0; i < nums.length; i++) {
        const firstNum = nums[i];
        const secondNum = target - firstNum;
        if (complementMap.has(secondNum) && complementMap.get(secondNum) !== i) {
            const secondIdx = complementMap.get(secondNum)!;
            return [i, secondIdx];
        }
    }
    return null;
}
