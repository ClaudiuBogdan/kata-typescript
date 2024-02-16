export default class DoublyLinkedList<T> {
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

    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
            next: this.head,
            prev: null,
        };

        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        this.len++;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.len) {
            this.append(item);
        }
        let currIdx = 0;
        let currNode = this.head;
        while (currNode && currIdx < idx) {
            currNode = currNode.next;
            currIdx++;
        }
        if (!currNode) {
            return;
        }

        const { prev, next } = currNode;
        const node: Node<T> = {
            value: item,
            next: currNode,
            prev,
        };
        currNode.prev = node;
        this.len++;
    }

    append(item: T): void {
        const node: Node<T> = {
            value: item,
            next: null,
            prev: this.tail,
        };
        if (this.head === null) {
            this.head = node;
        }
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        this.len++;
    }

    remove(item: T): T | undefined {
        let currNode = this.head;
        while (currNode && currNode.value !== item) {
            currNode = currNode.next;
        }
        if (!currNode) {
            return;
        }
        const { prev, next } = currNode;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        if (currNode === this.head) {
            this.head = currNode.next;
        }
        if (this.head) {
            this.head.prev = null;
        }
        if (currNode === this.tail) {
            this.tail = currNode.prev;
        }
        if (this.tail) {
            this.tail.next = null;
        }
        this.len--;
        return currNode.value;
    }
    get(idx: number): T | undefined {
        let currIdx = 0;
        let currNode = this.head;

        while (currNode && currIdx < idx) {
            currNode = currNode.next;
            currIdx++;
        }
        if (!currNode) {
            return;
        }
        return currNode.value;
    }

    removeAt(idx: number): T | undefined {
        let currIdx = 0;
        let currNode = this.head;
        while (currNode && currIdx < idx) {
            currNode = currNode.next;
            currIdx++;
        }

        if (!currNode) {
            return;
        }
        const { prev, next } = currNode;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        if (currNode === this.head) {
            this.head = currNode.next;
        }
        if (this.head) {
            this.head.prev = null;
        }
        if (currNode === this.tail) {
            this.tail = currNode.prev;
        }
        if (this.tail) {
            this.tail.next = null;
        }
        this.len--;
        return currNode.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};