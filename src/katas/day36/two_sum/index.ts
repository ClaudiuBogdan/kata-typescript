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
    const idxArr = Array.from({ length: nums.length }, (_, idx) => idx).sort(
        (a, b) => nums[a] - nums[b],
    ); // TODO: when sorting the array, also keep track of the original indexes
    const arr = idxArr.map((i) => nums[i]);
    let i = 0;
    let j = arr.length - 1;
    while (i < j) {
        const sum = arr[i] + arr[j];
        if (sum === target) {
            return [idxArr[i], idxArr[j]].sort((a, b) => a - b);
        }
        if (sum < target) {
            i++;
        } else {
            j--;
        }
    }
    return null;
}
