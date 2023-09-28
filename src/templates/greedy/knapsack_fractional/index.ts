/**
 * Represents an item with weight and value.
 */
export interface Item {
    weight: number;
    value: number;
}

/**
 * Solves the Fractional Knapsack problem using a greedy approach.
 *
 * @param {Item[]} items - An array of items with weight and value.
 * @param {number} capacity - The maximum weight the knapsack can hold.
 * @returns {number} The maximum value that can be obtained by selecting a fraction of items.
 *
 * @example
 * const items = [
 *   { weight: 10, value: 60 },
 *   { weight: 20, value: 100 },
 *   { weight: 30, value: 120 }
 * ];
 * const capacity = 50;
 * fractionalKnapsack(items, capacity);  // returns 240
 */
export function fractionalKnapsack(items: Item[], capacity: number): number {
    // Function implementation here
}
