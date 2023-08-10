import { IHeap } from "./types";

/**
 * @class MaxHeap - A max heap implementation
 * @description - A max heap is a binary tree where the parent node is always greater than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MaxHeap<T> implements IHeap<T> {
    private _size: number;
    private _heap: T[];
    public get size(): number {
        return this._size;
    }

    constructor() {
        this._size = 0;
        this._heap = [];
    }

    insert(value: T): void {
        this._heap.push(value);
        this._size++;
        this.bubbleUp(this.size - 1);
    }

    peek(): T | undefined {
        return this._heap[0];
    }

    pop(): T | undefined {
        if (this.size === 0) {
            return undefined;
        }
        const heap = this._heap;
        const root = heap[0];
        this._size--;

        if (this.size === 0) {
            return heap.pop() as T;
        }

        //Move last element to the root
        heap[0] = heap.pop() as T;

        this.bubbleDown(0);
        return root;
    }

    private bubbleUp(idx: number): void {
        const parentIdx = this.getParentIdx(idx);
        const heap = this._heap;
        if (parentIdx < 0) {
            return;
        }
        if (heap[parentIdx] >= heap[idx]) {
            return;
        }

        [heap[parentIdx], heap[idx]] = [heap[idx], heap[parentIdx]];
        return this.bubbleUp(parentIdx);
    }

    private getParentIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftChildIndex(idx: number): number {
        return idx * 2 + 1;
    }

    private getRightChild(idx: number): number {
        return idx * 2 + 2;
    }

    private bubbleDown(idx: number): void {
        const leftIdx = this.getLeftChildIndex(idx);
        const rightIdx = this.getRightChild(idx);
        const heap = this._heap;
        if (leftIdx >= this._size) {
            return;
        }
        const maxValueIdx =
            rightIdx < this._size && heap[rightIdx] > heap[leftIdx]
                ? rightIdx
                : leftIdx;
        if (heap[maxValueIdx] <= heap[idx]) {
            return;
        }
        [heap[idx], heap[maxValueIdx]] = [heap[maxValueIdx], heap[idx]];
        return this.bubbleDown(maxValueIdx);
    }
}
