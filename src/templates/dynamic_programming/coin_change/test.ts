// coinChange.test.ts

import coinChange from "./index";

describe("Coin Change Algorithm", () => {
    test("should return -1 when no change can be made", () => {
        expect(coinChange([2], 1)).toBe(-1);
        expect(coinChange([5, 10], 3)).toBe(-1);
    });

    test("should return 0 when the amount is 0", () => {
        expect(coinChange([1, 2, 3], 0)).toBe(0);
    });

    test("should return 1 when the amount is exactly one of the coins", () => {
        expect(coinChange([1, 2, 3], 1)).toBe(1);
        expect(coinChange([1, 2, 3], 2)).toBe(1);
        expect(coinChange([1, 2, 3], 3)).toBe(1);
    });

    test("should return the minimum number of coins needed", () => {
        expect(coinChange([1, 2, 5], 11)).toBe(3); // 5 + 5 + 1
        expect(coinChange([2, 5, 10], 15)).toBe(2); // 10 + 5
        expect(coinChange([1, 4, 5], 8)).toBe(2); // 4 + 4
    });

    test("should handle large amounts", () => {
        expect(coinChange([83, 186, 408, 419], 6249)).toBe(20);
    });
});
