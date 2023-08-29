import { IHeap } from "./types";

/**
 * @class MinHeap - A min heap implementation
 * @description - A min heap is a binary tree where the parent node is always smaller than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MinHeap<T> implements IHeap<T> {
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
        const minNode = this.peek();
        this._heap[0] = this._heap[this.size - 1];
        this._size--;
        this.bubbleDown(0);
        return minNode;
    }

    private bubbleUp(idx: number): void {
        if (idx <= 0 || idx >= this.size) {
            return;
        }
        const parentIdx = this.getParentIdx(idx);
        if (this._heap[parentIdx] > this._heap[idx]) {
            [this._heap[parentIdx], this._heap[idx]] = [
                this._heap[idx],
                this._heap[parentIdx],
            ];
            this.bubbleUp(parentIdx);
        }
    }

    private bubbleDown(idx: number): void {
        if (idx < 0 || idx >= this.size - 1) {
            return;
        }
        const leftIdx = idx * 2 + 1;
        const rightIdx = idx * 2 + 2;
        const minIdx =
            rightIdx < this.size && this._heap[rightIdx] < this._heap[leftIdx]
                ? rightIdx
                : leftIdx;
        if (this._heap[idx] > this._heap[minIdx]) {
            [this._heap[idx], this._heap[minIdx]] = [
                this._heap[minIdx],
                this._heap[idx],
            ];
            this.bubbleDown(minIdx);
        }
    }

    private getParentIdx(idx: number): number {
        if (idx <= 0 || idx >= this.size) {
            throw new Error(
                `Invalid index ${idx}. Parent index cannot be calculated`,
            );
        }
        return Math.floor((idx - 1) / 2);
    }
}
