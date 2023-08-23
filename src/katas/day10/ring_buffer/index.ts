export default class RingBuffer<T> {
    private size: number;
    private buff: T[];
    private head: number;
    private tail: number;
    private empty: boolean;
    private full: boolean;

    constructor(size: number) {
        this.size = size;
        this.buff = new Array(size);
        this.head = 0;
        this.tail = 0;
        this.empty = true;
        this.full = false;
    }

    public peak(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.buff[this.head];
    }

    public enqueue(item: T): T | null {
        if (this.isFull()) {
            throw new Error("Buffer is full");
        }
        this.head = this.getNextPosition(this.head);
        this.buff[this.head] = item;
        this.full = this.head === this.tail;
        this.empty = false;
        return item;
    }

    public dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        this.tail = this.getNextPosition(this.tail);
        const item = this.buff[this.tail];
        this.empty = this.tail === this.head;
        this.full = false;
        return item;
    }

    public isEmpty(): boolean {
        return this.empty;
    }

    public isFull(): boolean {
        return this.full;
    }

    private getNextPosition(idx: number): number {
        return idx === this.size - 1 ? 0 : idx + 1;
    }
}
