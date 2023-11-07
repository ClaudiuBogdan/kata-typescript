/**
 * Finds the maximum sum of any contiguous subarray.
 *
 * @param {number[]} nums - An array of integers.
 * @returns {number} The maximum sum of any contiguous subarray.
 *
 * @example
 * const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
 * maxSubarraySum(nums);  // returns 6
 */
export function maxSubarraySum(nums: number[]): number {
    let currMax = nums[0] ?? 0;
    let globalMax = currMax;

    for (let i = 1; i < nums.length; i++) { // TODO: element 0 is already added, so i starts at 1
        currMax = Math.max(nums[i], currMax + nums[i]);
        globalMax = Math.max(globalMax, currMax);
    }

    return globalMax;
}
