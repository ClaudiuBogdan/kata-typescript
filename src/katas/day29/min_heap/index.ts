import { IHeap } from "./types";

/**
 * @class MinHeap - A min heap implementation
 * @description - A min heap is a binary tree where the parent node is always smaller than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MinHeap<T> implements IHeap<T> {
    readonly size: number;
    insert(value: T): void {
        throw new Error("Method not implemented.");
    }
    peek(): T | undefined {
        throw new Error("Method not implemented.");
    }
    pop(): T | undefined {
        throw new Error("Method not implemented.");
    }
}
