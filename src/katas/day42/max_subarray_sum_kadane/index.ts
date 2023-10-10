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
        return 0;
    }
    let currSum = nums[0];
    let maxSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], nums[i] + currSum);
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
}
