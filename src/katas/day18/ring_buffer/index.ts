export default class RingBuffer<T> implements IRingBuffer<T> {
    private capacity: number;
    private buff: T[];
    private head: number;
    private tail: number;
    private empty: boolean;
    private full: boolean;

    constructor(capacity: number) {
        if (capacity < 1) {
            throw new Error("Capacity must be greater than 1.");
        }
        this.capacity = capacity;
        this.buff = [];
        this.head = -1;
        this.tail = 0;
        this.empty = true;
        this.full = false;
    }

    enqueue(item: T): void {
        if (this.full) {
            throw new Error("Buffer is full.");
        }
        const nextPos = this.getNextPost(this.head);
        this.buff[nextPos] = item;
        this.head = nextPos;
        this.full = this.getNextPost(this.head) === this.tail;
        this.empty = false;
    }

    dequeue(): T | undefined {
        if (this.empty) {
            return undefined;
        }
        const item = this.buff[this.tail];
        const nextPost = this.getNextPost(this.tail);
        this.tail = nextPost;
        this.empty = this.getNextPost(this.head) === this.tail;
        this.full = false;
        return item;
    }

    peak(): T | undefined {
        if (this.empty) {
            return undefined;
        }
        return this.buff[this.head];
    }

    isEmpty(): boolean {
        return this.empty;
    }

    isFull(): boolean {
        return this.full;
    }

    private getNextPost(idx: number): number {
        return idx === this.capacity - 1 ? 0 : idx + 1;
    }
}
