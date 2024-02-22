/**
 * Finds the minimum number of drops required to determine the floor from which a ball will break,
 * given an array of booleans representing the breaking behavior of the ball on each floor.
 * @link https://chat.openai.com/share/6df8adc2-c6a4-4aad-8ac8-4f401aa2b926
 * @param {number} n - The breaking floor.
 * @returns {number} The minimum number of drops required to find the breaking floor.
 */

export default function findBreakingFloor(n: number): number {
    const dp = Array.from({ length: n + 1 }, (_, i) => i);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] = Math.min(dp[i], Math.max(dp[i - j] + 1, j));
        }
    }

    return dp[n];
}
