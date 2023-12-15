export default class Queue<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private len: number;

    public get length(): number {
        return this.len;
    }

    constructor() {
        this.head = null;
        this.tail = null;
        this.len = 0;
    }

    enqueue(item: T): void {
        const node: Node<T> = {
            value: item,
            prev: this.tail,
            next: null,
        };
        if (this.len === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.len++;
    }

    deque(): T | undefined {
        if (this.len === 0) {
            return;
        }
        const val = this.head!.value;

        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
        }
        this.len--;
        return val;
    }
    peek(): T | undefined {
        if (this.len === 0) {
            return;
        }
        return this.head!.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};
