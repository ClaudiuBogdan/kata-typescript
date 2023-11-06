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
            next: null,
            prev: this.tail,
        };

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.len++;
    }

    deque(): T | undefined {
        if (this.length === 0) {
            return;
        }
        const oldHead = this.head!;
        this.head = oldHead.next;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        this.len--;
        return oldHead.value;
    }
    peek(): T | undefined {
        if(this.length === 0){
            return 
        }
        return this.head!.value
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};
