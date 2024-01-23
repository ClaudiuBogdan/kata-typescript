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
        if (this.len == 0) {
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
        } else if (this.len === 1) {
            const { value } = this.head!;
            this.head = null;
            this.tail = null;
            this.len--;
            return value;
        } else {
            const { value } = this.head!;
            this.head = this.head!.next!;
            this.head.prev = null;
            this.len--;
            return value;
        }
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
    prev: Node<T> | null;
    next: Node<T> | null;
};