import { fractionalKnapsack, Item } from "./index";

describe("Fractional Knapsack Greedy Algorithm", () => {
    test("should return 0 for an empty array of items", () => {
        expect(fractionalKnapsack([], 50)).toBe(0);
    });

    test("should return 0 for zero capacity", () => {
        const items: Item[] = [{ weight: 10, value: 60 }];
        expect(fractionalKnapsack(items, 0)).toBe(0);
    });

    test("should return the maximum value for a single item", () => {
        const items: Item[] = [{ weight: 10, value: 60 }];
        expect(fractionalKnapsack(items, 10)).toBe(60);
    });

    test("should return the maximum value for multiple items", () => {
        const items: Item[] = [
            { weight: 10, value: 60 },
            { weight: 20, value: 100 },
            { weight: 30, value: 120 },
        ];
        expect(fractionalKnapsack(items, 50)).toBe(240);
    });

    test("should handle fractional items", () => {
        const items: Item[] = [
            { weight: 10, value: 60 },
            { weight: 20, value: 100 },
            { weight: 30, value: 120 },
        ];
        expect(fractionalKnapsack(items, 15)).toBe(90);
    });

    test("should handle items with the same value-to-weight ratio", () => {
        const items: Item[] = [
            { weight: 10, value: 60 },
            { weight: 20, value: 120 },
        ];
        expect(fractionalKnapsack(items, 25)).toBe(150);
    });
});
