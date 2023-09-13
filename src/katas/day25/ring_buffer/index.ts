export default class RingBuffer<T extends string | number>
    implements IRingBuffer<T>
{
    private capacity: number;
    private head: number;
    private tail: number;
    private list: T[];
    private full: boolean;
    private empty: boolean;

    constructor(capacity: number) {
        if (capacity < 1) {
            throw new Error("Capacity must be grater than 0");
        }
        if (Math.floor(capacity) !== capacity) {
            throw new Error("Capacity must be an integer");
        }
        this.capacity = capacity;
        this.head = 0;
        this.tail = 0;
        this.full = false;
        this.empty = true;
        this.list = new Array(this.capacity);
    }

    public isFull(): boolean {
        return this.full;
    }

    public isEmpty(): boolean {
        return this.empty;
    }

    public peak(): T | undefined {
        if (this.empty) {
            return undefined;
        }
        return this.list[this.head];
    }

    public enqueue(item: T): void {
        if (this.full) {
            throw new Error("Buffer is full.");
        }
        this.empty = false;
        const nextPost = this.getNextPos(this.head);
        this.list[nextPost] = item;
        this.head = nextPost;
        this.full = this.head === this.tail;
    }

    public dequeue(): T | undefined {
        if (this.empty) {
            return undefined;
        }
        this.full = false;
        const nextPos = this.getNextPos(this.tail);
        this.tail = nextPos;
        this.empty = this.head === this.tail;
        return this.list[this.tail];
    }

    private getNextPos(pos: number): number {
        return pos + 1 >= this.capacity ? 0 : pos + 1;
    }
}
