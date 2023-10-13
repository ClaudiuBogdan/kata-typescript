import { twoSum } from "./index";

describe("Two Sum Problem", () => {
    test("should return null for an empty array", () => {
        expect(twoSum([], 10)).toBeNull();
    });

    test("should return null for an array with a single element", () => {
        expect(twoSum([5], 5)).toBeNull();
    });

    test("should return indices for a valid pair", () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        expect(twoSum(nums, target)).toEqual([0, 1]);
    });

    test("should return null if no valid pair exists", () => {
        const nums = [1, 2, 3, 4];
        const target = 10;
        expect(twoSum(nums, target)).toBeNull();
    });

    test("should handle negative numbers", () => {
        const nums = [-1, -2, -3, -4, -5];
        const target = -8;
        expect(twoSum(nums, target)).toEqual([2, 4]);
    });

    test("should handle zero as part of the pair", () => {
        const nums = [0, 1, 2, 3, 4];
        const target = 4;
        expect(twoSum(nums, target)).toEqual([0, 4]);
    });

    test("should handle duplicate numbers", () => {
        const nums = [3, 3];
        const target = 6;
        expect(twoSum(nums, target)).toEqual([0, 1]);
    });
});
