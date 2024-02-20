# Coin Change Problem

[ChatGPT response](https://chat.openai.com/c/ffacad76-8ab0-411d-83c8-ed6d31d43296)

### Problem Description

The Coin Change problem is a classical algorithmic problem that comes up often in both academia and the industry. The problem can be stated as follows:

**Given an array of integers representing coin denominations and an integer amount representing a total, you are to determine the fewest number of coins needed to make up that total.**

For example, consider the coin denominations `[1, 2, 5]` and the target amount `11`. The optimal solution is to take two coins of `5` and one coin of `1`, making up the total of `11` with 3 coins. Therefore, the answer is `3`.

Note that the problem may have constraints:

-   The same coin denomination can be used unlimited times unless stated otherwise.
-   It's possible that no combination of the coins can sum to the target amount.

### Types of Algorithms to Solve the Problem

1. **Brute-Force / Recursive Approach**: The simplest way to solve this problem is to explore all possible combinations of coins. This is highly inefficient and should usually be avoided for large inputs.

2. **Dynamic Programming - Top Down (Memoization)**: The recursive approach can be optimized using memoization to remember the outcomes of previously solved sub-problems.

3. **Dynamic Programming - Bottom Up (Tabulation)**: This approach involves filling up a table based on the sub-problems and is usually more efficient in terms of memory usage compared to memoization.

4. **Greedy Algorithm**: In some cases, if the coin denominations are special (like U.S. coin denominations), a greedy approach will work. However, this won't work for all sets of coin denominations.

### TypeScript Code Snippet for Dynamic Programming - Bottom Up (Tabulation)

Here's a TypeScript code snippet that employs the Dynamic Programming - Bottom Up approach to solve the Coin Change problem:

```typescript
function coinChange(coins: number[], amount: number): number {
    // Initialize DP array with value greater than the maximum possible number of coins
    const dp: number[] = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);

    // Base case: 0 amount requires 0 coins
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0 && dp[i - coin] !== Number.MAX_SAFE_INTEGER) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}

// Test the function
const coins = [1, 2, 5];
const amount = 11;
console.log(coinChange(coins, amount)); // Output should be 3
```

This algorithm has a time complexity of \(O(n \times m)\), where \(n\) is the target amount and \(m\) is the number of coin denominations. The space complexity is \(O(n)\), required for the dynamic programming table.

## Algorithm description

The bottom-up approach for solving the Coin Change problem is a form of Dynamic Programming that utilizes tabulation to iteratively solve the problem. Below is an in-depth explanation:

### Steps

1. **Initialization**: Create a table (usually an array) that will store the minimum number of coins required to make change for amounts from `0` to the target amount. Initialize all the values in this table to `Infinity` or `Number.MAX_SAFE_INTEGER` except for the `0`-th position, which should be initialized to `0`.

2. **Iterative Computation**: Loop through the DP table starting from `1` to the target amount. At each position `i`, try to find the minimum number of coins needed to make `i`, by using previous results in the DP table.

3. **Utilize Coin Denominations**: For each coin denomination, check if it is possible to use that coin to make the current amount `i`. If it is possible, update the DP table using the formula:  
   \[ \text{dp}[i] = \min(\text{dp}[i], \text{dp}[i - \text{coin}] + 1) \]

4. **Final Answer**: After the DP table is completely filled, the answer for the target amount will be stored at `dp[target_amount]`. If the value at that position is still `Infinity`, that means it's not possible to make that amount with the given coin denominations.

### Pseudocode

Here's a simplified pseudocode to illustrate these steps:

```plaintext
Initialize dp array of length (amount + 1) with all values as Infinity
dp[0] = 0

for i from 1 to amount
  for each coin in coins
    if i - coin >= 0 and dp[i - coin] is not Infinity
      dp[i] = min(dp[i], dp[i - coin] + 1)

if dp[amount] is Infinity
  return -1
else
  return dp[amount]
```

### Intuition

The intuition behind the DP table is that it holds the "global optimum" (i.e., minimum number of coins) for each "local sub-problem" (i.e., making change for a smaller amount). By building upon the solutions to smaller problems, we can efficiently find the solution to the original problem.

### Complexity

-   **Time Complexity**: \(O(n \times m)\), where \(n\) is the target amount and \(m\) is the number of coin denominations.
-   **Space Complexity**: \(O(n)\), for the DP table.

### Example

Let's take an example with coin denominations `[1, 2, 5]` and target amount `11`.

-   Initialize `dp = [0, Inf, Inf, ..., Inf]` (of length 12, index 0 to 11)
-   At `i = 1`, we can use coin `1` (since 1 - 1 = 0 and `dp[0] = 0`). Therefore, `dp[1] = dp[0] + 1 = 1`.
-   At `i = 2`, we can use coin `1` or `2`. Minimum is `dp[2] = min(dp[1] + 1, dp[0] + 1) = 1`.
-   At `i = 11`, `dp[11] = min(dp[10] + 1, dp[9] + 1, dp[6] + 1) = 3`.

Would you like to explore this approach further or see additional examples?
