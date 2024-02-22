/**
 * Solves the 0/1 Knapsack Problem to find the maximum value that can be achieved within a given weight limit.
 *
 * @param {number[]} weights - An array of integers representing the weights of the items.
 * @param {number[]} values - An array of integers representing the values of the items.
 * @param {number} capacity - An integer representing the maximum weight the knapsack can hold.
 * @returns {number} The maximum value that can be achieved within the given weight limit.
 *
 * @example
 * knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7);  // returns 9 (items with weight 3 and 4, values 4 and 5)
 * knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5);  // returns 7 (items with weight 2 and 3, values 3 and 4)
 */
export default function knapsack(
    weights: number[],
    values: number[],
    capacity: number,
): number {

    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] > w) {
                dp[i][w] = dp[i - 1][w];
            } else {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1],
                );
            }
        }
    }
    return dp[n][capacity];
}
