import { areAnagrams } from "./index";

describe("Anagram Check", () => {
    test("should return true for empty strings", () => {
        expect(areAnagrams("", "")).toBe(true);
    });

    test("should return false for strings of different lengths", () => {
        expect(areAnagrams("a", "aa")).toBe(false);
    });

    test("should return true for anagrams", () => {
        expect(areAnagrams("listen", "silent")).toBe(true);
        expect(areAnagrams("triangle", "integral")).toBe(true);
    });

    test("should return false for non-anagrams", () => {
        expect(areAnagrams("hello", "world")).toBe(false);
    });

    test("should ignore spaces and special characters", () => {
        expect(areAnagrams("Astronomer", "Moon starer")).toBe(true);
    });
});
