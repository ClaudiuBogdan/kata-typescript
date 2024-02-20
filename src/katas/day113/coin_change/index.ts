/**
 * Calculates the minimum number of coins needed to make up a given amount.
 *
 * @param {number[]} coins - An array of integers representing the available coin denominations.
 * @param {number} amount - The target amount to reach using the given coin denominations.
 * @returns {number} The minimum number of coins needed to make up the given amount. Returns -1 if the amount cannot be made up by any combination of the coins.
 *
 * @example
 * coinChange([1, 2, 5], 11);  // returns 3 (5 + 5 + 1)
 * coinChange([2], 3);  // returns -1 (no combination can sum to 3)
 */
export default function coinChange(coins: number[], amount: number): number {
    const dp: number[] = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            const comp = i - coin;
            if (comp >= 0 && dp[comp] < Infinity) {
                dp[i] = Math.min(dp[i], dp[comp] + 1);
            }
        }
    }

    return dp[amount] < Infinity ? dp[amount] : -1;
}
