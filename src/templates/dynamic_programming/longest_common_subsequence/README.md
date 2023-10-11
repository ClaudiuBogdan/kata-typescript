# Longest Common Subsequence (LCS) Problem

## Problem Description

The Longest Common Subsequence (LCS) problem is a classic computer science problem that asks for the longest subsequence that two strings have in common. A subsequence is a sequence of characters that appear in the same order in both strings, but not necessarily consecutively.

For example, consider the strings `ABCBDAB` and `BDCAB`. The LCS for these two strings is `BCAB`.

Note that there can be more than one LCS for two strings. For instance, for the strings `ABCBDAB` and `BDCABA`, the LCS could be `BCAB` or `BDAB`.

## Algorithmic Solutions

Several algorithms can solve the LCS problem:

1. **Brute Force**: Generate all subsequences for each string and check for the longest common one. This approach is inefficient and takes exponential time, specifically \(O(2^n)\) where \(n\) is the length of the string.

2. **Dynamic Programming**: The most commonly used algorithm to solve this problem efficiently is Dynamic Programming, which has a time complexity of \(O(m \times n)\), where \(m\) and \(n\) are the lengths of the two strings.

3. **Recursive Approach**: A simple recursive approach can also solve this problem, but it is generally inefficient with a time complexity of \(O(2^{m+n})\), where \(m\) and \(n\) are the lengths of the two strings.

4. **Memoization**: The recursive approach can be optimized by using memoization to store previously computed results, which can reduce the time complexity to \(O(m \times n)\).

## Dynamic Programming Solution in TypeScript

Here is a TypeScript implementation using Dynamic Programming:

```typescript
function longestCommonSubsequence(str1: string, str2: string): string {
    const m: number = str1.length;
    const n: number = str2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () =>
        Array(n + 1).fill(0),
    );

    // Populate the dp matrix
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct the LCS
    let i = m;
    let j = n;
    let lcs: string = "";

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs;
}

const str1 = "ABCBDAB";
const str2 = "BDCAB";
console.log(
    "The Longest Common Subsequence is:",
    longestCommonSubsequence(str1, str2),
); // Output should be "BCAB"
```

The dynamic programming approach to solving the Longest Common Subsequence (LCS) problem aims to break the problem down into smaller, overlapping sub-problems and solves them in a bottom-up manner. Below, I've broken down the key steps involved in the dynamic programming solution for the LCS problem:

### 1. Initialize a Matrix

Create a two-dimensional matrix (array of arrays) `dp` with dimensions `(m+1) x (n+1)`, where `m` and `n` are the lengths of the two strings `str1` and `str2` respectively. Initialize all elements to 0.

This matrix will be used to store the length of the LCS of substrings of `str1` and `str2`.

### 2. Populate the Matrix

Iterate through the two strings character by character. Use the matrix `dp` to store the length of the LCS up to the `i-th` and `j-th` characters of `str1` and `str2` respectively.

-   If `str1[i]` is equal to `str2[j]`, then `dp[i][j] = dp[i-1][j-1] + 1`. This means we can extend the LCS by one character.
-   If they are not equal, take the maximum of the LCS lengths computed so far, i.e., `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

### 3. Reconstruct the LCS

Starting from `dp[m][n]`, where `m` and `n` are the lengths of `str1` and `str2` respectively, backtrack to reconstruct the LCS string.

-   If `str1[i]` is equal to `str2[j]`, include this character in the LCS, and move diagonally up-left in the matrix.
-   If they are not equal, move either up or left, choosing the direction with the greater LCS length stored in the matrix.

### TypeScript Code Snippets for Each Step

1. **Initialize a Matrix**

```typescript
const m: number = str1.length;
const n: number = str2.length;
const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
);
```

2. **Populate the Matrix**

```typescript
for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}
```

3. **Reconstruct the LCS**

```typescript
let i = m;
let j = n;
let lcs: string = "";

while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
        lcs = str1[i - 1] + lcs;
        i--;
        j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
    } else {
        j--;
    }
}
```

Putting all these steps together, you get a complete dynamic programming solution for the LCS problem.

## References

- [ChatGPT explanation](https://chat.openai.com/c/ce0bf167-862e-405a-a84b-02f349d0ea3b)

- [Neetcode video explanation](https://www.youtube.com/watch?v=Ua0GhsJSlWM)
