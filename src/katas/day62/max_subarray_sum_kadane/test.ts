import { maxSubarraySum } from "./index";

describe("Max Subarray Sum - Kadane's Algorithm", () => {
    test("should return 0 for an empty array", () => {
        expect(maxSubarraySum([])).toBe(0);
    });

    test("should return the only element for an array with a single element", () => {
        expect(maxSubarraySum([5])).toBe(5);
    });

    test("should return the maximum sum for a valid subarray", () => {
        const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
        expect(maxSubarraySum(nums)).toBe(6);
    });

    test("should handle negative numbers", () => {
        const nums = [-1, -2, -3, -4];
        expect(maxSubarraySum(nums)).toBe(-1);
    });

    test("should handle zeros", () => {
        const nums = [0, 0, 0, 0];
        expect(maxSubarraySum(nums)).toBe(0);
    });

    test("should handle all positive numbers", () => {
        const nums = [1, 2, 3, 4];
        expect(maxSubarraySum(nums)).toBe(10);
    });
});
