// knapsack.test.ts

import knapsack from "./index";

describe("Knapsack Problem", () => {
    test("should return 0 when the knapsack is empty", () => {
        expect(knapsack([], [], 10)).toBe(0);
    });

    test("should return 0 when the knapsack has zero capacity", () => {
        expect(knapsack([1, 2, 3], [10, 20, 30], 0)).toBe(0);
    });

    test("should return the maximum value when items can be fully included", () => {
        expect(knapsack([1, 2, 3], [10, 20, 30], 6)).toBe(60);
    });

    test("should return the maximum value when items can be partially included", () => {
        expect(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5)).toBe(7);
    });

    test("should handle large numbers", () => {
        expect(knapsack([1000, 2000, 3000], [1000, 2000, 3000], 5000)).toBe(
            4000,
        );
    });

    test("should return the maximum value for complex cases", () => {
        expect(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)).toBe(9);
    });
});
