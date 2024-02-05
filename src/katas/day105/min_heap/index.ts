import { IHeap } from "./types";

/**
 * @class MinHeap - A min heap implementation
 * @description - A min heap is a binary tree where the parent node is always smaller than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MinHeap<T> implements IHeap<T> {
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
        } else if (this.size === 1) {
            return this.heap.pop();
        } else {
            const item = this.heap[0];
            this.heap[0] = this.heap.pop()!;
            this.bubbleDown(0);
            return item;
        }
    }

    private bubbleUp(idx: number): void {
        if (idx <= 0) {
            return;
        }
        const parentIdx = Math.floor((idx - 1) / 2);
        const heap = this.heap;
        if (heap[idx] < heap[parentIdx]) {
            [heap[idx], heap[parentIdx]] = [heap[parentIdx], heap[idx]];
            this.bubbleUp(parentIdx);
        }
    }

    private bubbleDown(idx: number): void {
        if (idx >= this.size - 1) {
            return;
        }
        const left = idx * 2 + 1;
        const right = idx * 2 + 2;
        const heap = this.heap;
        if (left >= this.size) {
            return;
        }
        const minIdx =
            right < this.size && heap[right] < heap[left] ? right : left;

        if (heap[idx] > heap[minIdx]) {
            [heap[idx], heap[minIdx]] = [heap[minIdx], heap[idx]];
            this.bubbleDown(minIdx);
        }
    }
}
