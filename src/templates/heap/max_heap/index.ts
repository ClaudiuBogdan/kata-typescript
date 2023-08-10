import { IHeap } from "./types";

/**
 * @class MaxHeap - A max heap implementation
 * @description - A max heap is a binary tree where the parent node is always greater than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MaxHeap<T> implements IHeap<T> {
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
