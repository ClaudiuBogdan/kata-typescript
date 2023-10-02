import { isPalindrome } from "./index";

describe("Palindrome Check", () => {
    test("should return true for an empty string", () => {
        expect(isPalindrome("")).toBe(true);
    });

    test("should return true for a single character", () => {
        expect(isPalindrome("a")).toBe(true);
    });

    test("should return true for a palindrome string", () => {
        expect(isPalindrome("racecar")).toBe(true);
        expect(isPalindrome("level")).toBe(true);
    });

    test("should return false for a non-palindrome string", () => {
        expect(isPalindrome("hello")).toBe(false);
        expect(isPalindrome("world")).toBe(false);
    });
    
    test("should ignore spaces and special characters", () => {
        expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    });
});
