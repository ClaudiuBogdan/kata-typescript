export default class RingBuffer<T> implements IRingBuffer<T> {
    private arr: T[];
    private head: number;
    private tail: number;
    private full: boolean;
    private empty: boolean;

    constructor(capacity: number) {
        if (capacity < 1) {
            throw new Error("Invalid size");
        }

        this.arr = new Array(capacity);
        this.head = 0;
        this.tail = 0;
        this.full = false;
        this.empty = true;
    }

    enqueue(item: T): void {
        if (this.full) {
            throw new Error("Max cap reached");
        }
        this.head = this.getNextIdx(this.head);
        this.arr[this.head] = item;
        this.full = this.head === this.tail;
        this.empty = false;
    }
    dequeue(): T | undefined {
        if (this.empty) {
            return undefined;
        }
        this.tail = this.getNextIdx(this.tail);
        const val = this.arr[this.tail];

        this.empty = this.head === this.tail;
        this.full = false;
        return val;
    }
    peak(): T | undefined {
        if (this.empty) {
            return;
        }
        return this.arr[this.head];
    }

    isFull(): boolean {
        return this.full;
    }
    isEmpty(): boolean {
        return this.empty;
    }

    private getNextIdx(idx: number): number {
        const nextIdx = idx + 1;
        return nextIdx >= this.arr.length ? 0 : nextIdx;
    }
}
