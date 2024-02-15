export default class SinglyLinkedList<T> {
    private head: Node<T> | null;
    private len: number;

    public get length(): number {
        return this.len;
    }

    constructor() {
        this.head = null;
        this.len = 0;
    }

    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
            next: this.head,
        };
        this.head = node;
        this.len++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx >= this.len) {
            return;
        }

        let currIdx = 0;
        let prevNode: Node<T> | null = null;
        let currNode = this.head;
        while (currNode && currIdx < idx) {
            prevNode = currNode;
            currNode = currNode.next;
        }
        if (!currNode) {
            return;
        }
        const node: Node<T> = {
            value: item,
            next: currNode,
        };
        if (prevNode) {
            prevNode.next = node;
        } else {
            this.head = node;
        }
        this.len++;
    }

    append(item: T): void {
        if (this.len === 0) {
            return this.prepend(item);
        }

        let currIdx = 0;
        let currNode = this.head;

        while (currNode && currIdx < this.len - 1) {
            currIdx++;
            currNode = currNode.next;
        }

        if (!currNode) {
            return;
        }

        const node: Node<T> = {
            value: item,
            next: null,
        };

        currNode.next = node;
        this.len++;
    }

    remove(item: T): T | undefined {
        let currNode: Node<T> | null = this.head;
        let prevNode: Node<T> | null = null;

        while (currNode && currNode.value !== item) {
            prevNode = currNode;
            currNode = currNode.next;
        }

        if (!currNode) {
            return;
        }

        if (prevNode) {
            prevNode.next = currNode.next;
        } else {
            this.head = currNode.next;
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
        let prevNode: Node<T> | null = null;

        while (currNode && currIdx < idx) {
            prevNode = currNode;
            currNode = currNode.next;
            currIdx++;
        }

        if (!currNode) {
            return;
        }

        if (prevNode) {
            prevNode.next = currNode.next;
        } else {
            this.head = currNode.next;
        }
        this.len--;
        return currNode.value;
    }
}

type Node<T> = {
    value: T;
    next: Node<T> | null;
};
