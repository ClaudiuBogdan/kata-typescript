import { maxSumSubarrayOfSizeK } from "./index";

describe("Sliding Window Technique - Max Sum Subarray of Size K", () => {
    test("should return 0 for an empty array", () => {
        expect(maxSumSubarrayOfSizeK([], 3)).toBe(0);
    });

    test("should return 0 for k greater than array length", () => {
        expect(maxSumSubarrayOfSizeK([1, 2, 3], 4)).toBe(0);
    });

    test("should return the sum of all elements for k equal to array length", () => {
        expect(maxSumSubarrayOfSizeK([1, 2, 3], 3)).toBe(6);
    });

    test("should return the maximum sum for a valid subarray of size k", () => {
        const nums = [2, 1, 5, 1, 3, 2];
        const k = 3;
        expect(maxSumSubarrayOfSizeK(nums, k)).toBe(9);
    });

    test("should handle negative numbers", () => {
        const nums = [-1, -2, -3, -4];
        const k = 2;
        expect(maxSumSubarrayOfSizeK(nums, k)).toBe(-3);
    });

    test("should handle zeros", () => {
        const nums = [0, 0, 0, 0];
        const k = 2;
        expect(maxSumSubarrayOfSizeK(nums, k)).toBe(0);
    });
});
