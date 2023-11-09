// Import your functions here
import { huffmanCoding, decode } from "./index";

describe("Huffman Coding", () => {
    test("should encode and decode a simple string", () => {
        const input = "abracadabra";
        const [encoded, huffmanTree, huffmanCode] = huffmanCoding(input);

        // Ensure it's encoded to a shorter length
        expect(encoded.length).toBeLessThan(input.length * 8); // Each ASCII character takes 8 bits

        // Ensure it can be decoded to the original string
        const decoded = decode(encoded, huffmanTree);
        expect(decoded).toBe(input);
    });

    test("should handle strings with multiple distinct characters", () => {
        const input = "hello world";
        const [encoded, huffmanTree, huffmanCode] = huffmanCoding(input);

        const decoded = decode(encoded, huffmanTree);
        expect(decoded).toBe(input);
    });

    test("should handle an empty string", () => {
        const input = "";
        const [encoded, huffmanTree, huffmanCode] = huffmanCoding(input);

        const decoded = decode(encoded, huffmanTree);
        expect(decoded).toBe(input);
    });

    test("should handle strings with a single character", () => {
        const input = "aaaaaaa";
        const [encoded, huffmanTree, huffmanCode] = huffmanCoding(input);
        expect(encoded.length).toBeGreaterThan(0);

        const decoded = decode(encoded, huffmanTree);
        expect(decoded).toBe(input);
    });
});
