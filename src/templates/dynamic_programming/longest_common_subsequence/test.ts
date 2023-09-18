// lcs.test.ts

import longestCommonSubsequence from "./index";

describe("Longest Common Subsequence", () => {
    test("should return an empty string for empty input strings", () => {
        expect(longestCommonSubsequence("", "")).toBe("");
    });

    test("should return an empty string when one input string is empty", () => {
        expect(longestCommonSubsequence("ABC", "")).toBe("");
        expect(longestCommonSubsequence("", "ABC")).toBe("");
    });

    test("should return an empty string for strings with no common subsequence", () => {
        expect(longestCommonSubsequence("ABC", "DEF")).toBe("");
    });

    test("should return 'A' for strings 'ABC' and 'A'", () => {
        expect(longestCommonSubsequence("ABC", "A")).toBe("A");
    });

    test("should return 'AC' for strings 'ABC' and 'AC'", () => {
        expect(longestCommonSubsequence("ABC", "AC")).toBe("AC");
    });

    test("should return 'BC' for strings 'ABC' and 'BEC'", () => {
        expect(longestCommonSubsequence("ABC", "BEC")).toBe("BC");
    });

    test("should return 'ABAD' for strings 'ABABC' and 'BABCAD'", () => {
        expect(longestCommonSubsequence("ABABC", "BABCAD")).toBe("ABAD");
    });

    test("should return 'GTAB' for strings 'AGGTAB' and 'GXTXAYB'", () => {
        expect(longestCommonSubsequence("AGGTAB", "GXTXAYB")).toBe("GTAB");
    });
});
