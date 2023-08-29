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
        if(this.size === 0){
            return undefined
        }
        return this._heap[0];
    }
    pop(): T | undefined {
        if(this.size === 0){
            return undefined
        }
        const max = this.peek();
        this._heap[0] = this._heap[this.size - 1];
        this._size--;
        this.bubbleDown(0);
        return max;
    }

    private bubbleUp(idx: number): void {
        if (idx <= 0 || idx >= this.size) {
            return;
        }
        const parentIdx = Math.floor((idx - 1) / 2);
        if (this._heap[parentIdx] < this._heap[idx]) {
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
            rightIdx < this.size && this._heap[rightIdx] > this._heap[leftIdx]
                ? rightIdx
                : leftIdx;
        if (this._heap[minIdx] > this._heap[idx]) {
            [this._heap[minIdx], this._heap[idx]] = [
                this._heap[idx],
                this._heap[minIdx],
            ];
            this.bubbleDown(minIdx);
        }
    }
}
