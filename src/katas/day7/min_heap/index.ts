import { IHeap } from "./types";

/**
 * @class MinHeap - A min heap implementation
 * @description - A min heap is a binary tree where the parent node is always smaller than or equal to the child nodes.
 * @link - https://www.geeksforgeeks.org/heap-data-structure/
 */
export default class MinHeap<T> implements IHeap<T> {
    private _size: number;
    private _heap: T[];

    get size(): number {
        return this._size;
    }

    constructor() {
        this._size = 0;
        this._heap = [];
    }

    insert(value: T): void {
        this._heap.push(value);
        this._size++;
        this.bubbleUp(this._size - 1);
    }
    peek(): T | undefined {
        return this._heap[0];
    }
    pop(): T | undefined {
        if (this._size === 0) {
            return undefined;
        }
        const heap = this._heap;
        const head = heap[0];
        //Move last element to the head
        heap[0] = heap.pop() as T;
        this._size--;
        //Bubble down the node
        this.bubbleDown(0);
        return head;
    }

    private bubbleUp(idx: number): void {
        const parentIdx = this.getParentIdx(idx);
        if (parentIdx >= 0 && this._heap[parentIdx] > this._heap[idx]) {
            [this._heap[parentIdx], this._heap[idx]] = [
                this._heap[idx],
                this._heap[parentIdx],
            ];
            return this.bubbleUp(parentIdx);
        }
    }

    private bubbleDown(idx: number): void {
        const heap = this._heap;
        const leftIdx = this.getLeftChildIdx(idx);
        const rightIdx = this.getRightChildIdx(idx);
        if (leftIdx >= this.size) {
            return;
        }
        const minValueIdx =
            rightIdx < this.size && heap[rightIdx] < heap[leftIdx]
                ? rightIdx
                : leftIdx;

        if (heap[minValueIdx] < heap[idx]) {
            [heap[idx], heap[minValueIdx]] = [heap[minValueIdx], heap[idx]];
            return this.bubbleDown(minValueIdx);
        }
    }

    private getParentIdx(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftChildIdx(idx: number): number {
        return idx * 2 + 1;
    }

    private getRightChildIdx(idx: number): number {
        return idx * 2 + 2;
    }
}
