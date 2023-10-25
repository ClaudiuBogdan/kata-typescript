export class PriorityQueue<T> implements IPriorityQueue<T> {
    private _heap: Array<T>;
    private _compare: (a: T, b: T) => number;

    public get size(): number {
        return this._heap.length;
    }

    constructor(compare: (a: T, b: T) => number) {
        this._compare = compare;
        this._heap = [];
    }

    public enqueue(item: T): void {
        this._heap.push(item);
        this.bubbleUp(this.size - 1);
    }

    public dequeue(): T | undefined {
        if (this.size === 0) {
            return;
        }
        if (this.size === 1) {
            return this._heap.pop()!; // TODO: be careful with pop and push method, as it may get out of sync with the size of the heap.
        }
        const minEl = this._heap[0];
        this._heap[0] = this._heap.pop()!;
        this.bubbleDown(0);
        return minEl;
    }

    private bubbleUp(idx: number): void {
        if (idx <= 0) {
            return;
        }
        const parentIdx = Math.floor((idx - 1) / 2);
        if (this._compare(this._heap[parentIdx], this._heap[idx]) > 0) {
            [this._heap[parentIdx], this._heap[idx]] = [
                this._heap[idx],
                this._heap[parentIdx],
            ];
            this.bubbleUp(parentIdx);
        }
    }

    private bubbleDown(idx: number): void {
        const leftIdx = idx * 2 + 1;
        const rightIdx = idx * 2 + 2;
        if (leftIdx > this.size - 1) {
            return;
        }
        const minValIdx =
            rightIdx < this.size &&
            this._compare(this._heap[leftIdx], this._heap[rightIdx]) > 0
                ? rightIdx
                : leftIdx;
        if (this._compare(this._heap[idx], this._heap[minValIdx]) > 0) {
            [this._heap[idx], this._heap[minValIdx]] = [
                this._heap[minValIdx],
                this._heap[idx],
            ];
            this.bubbleDown(minValIdx);
        }
    }
}

export interface IPriorityQueue<T> {
    size: number;
    enqueue: (item: T) => void;
    dequeue: () => T | undefined;
}
