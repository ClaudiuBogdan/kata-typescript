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
    if (nums.length === 0) {
        return 0
    }
    let currentMax = nums[0];
    let globalMax = currentMax;
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        globalMax = Math.max(globalMax, currentMax);
    }
    return globalMax;
}
