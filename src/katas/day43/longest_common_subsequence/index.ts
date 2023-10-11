/**
 * Finds the longest common subsequence (LCS) between two strings.
 *
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {string} The longest common subsequence between the two strings. Returns an empty string if no common subsequence exists.
 *
 * @example
 * longestCommonSubsequence("ABC", "AC");  // returns "AC"
 * longestCommonSubsequence("ABABC", "BABCAD");  // returns "ABAD"
 * longestCommonSubsequence("AGGTAB", "GXTXAYB");  // returns "GTAB"
 */
export default function longestCommonSubsequence(
    str1: string,
    str2: string,
): string {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(0),
    );

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let i = str1.length;
    let j = str2.length;
    let lcs = "";
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
