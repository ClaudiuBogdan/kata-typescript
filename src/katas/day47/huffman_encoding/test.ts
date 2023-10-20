import { huffmanEncoding } from "./index";

describe("Huffman Coding Greedy Algorithm", () => {
    test("should return an empty object for an empty string", () => {
        expect(huffmanEncoding("")).toEqual({});
    });

    test("should return Huffman codes for a single character string", () => {
        expect(huffmanEncoding("a")).toEqual({ a: "0" });
    });

    test("should return Huffman codes for a string with all identical characters", () => {
        expect(huffmanEncoding("aaaaa")).toEqual({ a: "0" });
    });

    test("should return Huffman codes for each unique character in the string", () => {
        const text = "abracadabra";
        const codes = huffmanEncoding(text);
        expect(Object.keys(codes).sort()).toEqual(
            ["a", "b", "c", "d", "r"].sort(),
        );
    });

    test("should generate optimal Huffman codes", () => {
        const text = "this is an example for huffman encoding";
        const codes = huffmanEncoding(text);
        // Check if frequently occurring characters have shorter codes
        expect(codes[" "].length).toBeLessThanOrEqual(codes["x"].length);
        expect(codes["e"].length).toBeLessThanOrEqual(codes["x"].length);
    });

    test("should handle case sensitivity", () => {
        const text = "Aa";
        const codes = huffmanEncoding(text);
        expect(codes).toHaveProperty("A");
        expect(codes).toHaveProperty("a");
    });

    test("should handle special characters", () => {
        const text = "!@#";
        const codes = huffmanEncoding(text);
        expect(codes).toHaveProperty("!");
        expect(codes).toHaveProperty("@");
        expect(codes).toHaveProperty("#");
    });

    test("should handle numbers", () => {
        const text = "123";
        const codes = huffmanEncoding(text);
        expect(codes).toHaveProperty("1");
        expect(codes).toHaveProperty("2");
        expect(codes).toHaveProperty("3");
    });

    test("should handle a mix of characters, numbers, and special characters", () => {
        const text = "a1!";
        const codes = huffmanEncoding(text);
        expect(codes).toHaveProperty("a");
        expect(codes).toHaveProperty("1");
        expect(codes).toHaveProperty("!");
    });
});
