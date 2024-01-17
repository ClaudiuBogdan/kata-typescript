import { IHeap } from "./types";

/**
 * @class MaxHeap - A max heap implementation
 * @description - A max heap is a binary tree where the parent node is always greater than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MaxHeap<T> implements IHeap<T> {
    private heap: T[];
    public get size(): number {
        return this.heap.length;
    }

    constructor() {
        this.heap = [];
    }

    insert(value: T): void {
        this.heap.push(value);
        this.bubbleUp(this.size - 1);
    }

    peek(): T | undefined {
        if (this.size === 0) {
            return;
        }
        return this.heap[0];
    }

    pop(): T | undefined {
        if (this.size === 0) {
            return;
        }
        if (this.size === 1) {
            return this.heap.pop();
        }

        const maxVal = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return maxVal;
    }

    private bubbleUp(idx: number): void {
        if (idx <= 0) {
            return;
        }
        const parentIdx = Math.floor((idx - 1) / 2);
        const heap = this.heap;
        if (heap[idx] > heap[parentIdx]) {
            [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
            this.bubbleUp(parentIdx);
        }
    }

    private bubbleDown(idx: number): void {
        if (idx >= this.size - 1) {
            return;
        }
        const leftIdx = idx * 2 + 1;
        const rightIdx = idx * 2 + 2;
        const heap = this.heap;

        if (leftIdx >= this.size) {
            return;
        }
        const maxIdx =
            rightIdx < this.size && heap[rightIdx] > heap[leftIdx]
                ? rightIdx
                : leftIdx;
        if (heap[idx] < heap[maxIdx]) {
            [heap[idx], heap[maxIdx]] = [heap[maxIdx], heap[idx]];
            this.bubbleDown(maxIdx);
        }
    }
}
