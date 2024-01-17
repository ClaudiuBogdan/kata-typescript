import { ITrie } from "./types";

/**
 * @class Trie
 * @description A trie is a tree-like data structure whose nodes store the letters of an alphabet. It is used for efficient retrieval of a key in a large data set of strings.
 * @link https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials/
 */
export default class Trie implements ITrie {
    insert(word: string): void {
        throw new Error("Method not implemented.");
    }
    delete(word: string): void {
        throw new Error("Method not implemented.");
    }
    search(word: string): boolean {
        throw new Error("Method not implemented.");
    }
    startsWith(prefix: string): string[] {
        throw new Error("Method not implemented.");
    }
}
