import { isMatch } from "./index";

describe("Regular Expression Matching", () => {
    test("should return true for empty text and empty pattern", () => {
        expect(isMatch("", "")).toBe(true);
    });

    test("should return false for empty pattern and non-empty text", () => {
        expect(isMatch("text", "")).toBe(false);
    });

    test("should return true for empty text and pattern containing only '*'", () => {
        expect(isMatch("", "*")).toBe(true);
    });

    test("should return true for matching text and pattern", () => {
        expect(isMatch("aa", "a*")).toBe(true);
        expect(isMatch("aab", "c*a*b")).toBe(true);
    });

    test("should return false for non-matching text and pattern", () => {
        expect(isMatch("mississippi", "mis*is*p*.")).toBe(false);
        expect(isMatch("aa", "a")).toBe(false);
    });

    test("should handle '.' as wildcard character", () => {
        expect(isMatch("ab", ".b")).toBe(true);
        expect(isMatch("abc", "a.c")).toBe(true);
    });

    test("should handle '*' for zero or more preceding elements", () => {
        expect(isMatch("aaa", "a*a")).toBe(true);
        expect(isMatch("aaa", "ab*a*c*a")).toBe(true);
    });
});
