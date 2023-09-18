import { kmpSearch } from "./index";

describe("KMP Algorithm for String Matching", () => {
    test("should return an empty array for empty text", () => {
        expect(kmpSearch("", "pattern")).toEqual([]);
    });

    test("should return an empty array for empty pattern", () => {
        expect(kmpSearch("text", "")).toEqual([]);
    });

    test("should return an empty array if pattern is longer than text", () => {
        expect(kmpSearch("short", "longerPattern")).toEqual([]);
    });

    test("should return the starting indices where the pattern occurs", () => {
        expect(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB")).toEqual([10]);
        expect(kmpSearch("hello world", "world")).toEqual([6]);
    });

    test("should handle multiple occurrences", () => {
        expect(kmpSearch("ABABA", "ABA")).toEqual([0, 2]);
    });

    test("should be case-sensitive", () => {
        expect(kmpSearch("Hello World", "world")).toEqual([]);
    });
});
