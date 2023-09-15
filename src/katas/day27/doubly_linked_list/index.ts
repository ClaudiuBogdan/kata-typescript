export default class DoublyLinkedList<T> {
    private _head: ListNode<T> | undefined;
    private _tail: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = undefined;
        this._tail = undefined;
        this._length = 0;
    }

    prepend(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(node, this._head);
        this._head = node;
        if (this._length === 0) {
            this._tail = node;
        }
        this._length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx <= 0 || idx > this.length) {
            return undefined;
        }
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.length) {
            return this.append(item);
        }
        let currIdx = 0;
        let currNode = this._head;
        while (currNode && currIdx < idx) {
            currNode = currNode.next;
        }
        if (!currNode) {
            return;
        }
        const prevNode = currNode.prev;
        const nextNode = currNode;
        const node = this.createNode(item);
        this.linkNodes(prevNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }

    append(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(this._tail, node);
        this._tail = node;
        if (this.length === 0) {
            this._head = node;
        }
        this._length++;
    }

    remove(item: T): T | undefined {
        let node = this._head;
        while (node && node.value !== item) {
            node = node.next;
        }
        if (!node) {
            return;
        }
        const prevNode = node.prev;
        const nextNode = node.next;
        this.linkNodes(prevNode, nextNode);
        node.next = undefined;
        node.prev = undefined;
        if (this._head?.value === item) {
            this._head = nextNode;
        }
        if (this._tail?.value === item) {
            this._tail = prevNode;
        }
        this._length--;
        return item;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return;
        }
        let currIdx = 0;
        let node = this._head;
        while (node && currIdx < idx) {
            node = node.next;
            currIdx++;
        }
        if (!node) {
            return;
        }
        return node.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return;
        }
        let currIdx = 0;
        let node = this._head;
        while (node && currIdx < idx) {
            node = node.next;
            currIdx++;
        }
        if (!node) {
            return;
        }
        const prevNode = node.prev;
        const nextNode = node.next;
        this.linkNodes(prevNode, nextNode);
        node.next = undefined;
        node.prev = undefined;
        if (node.value === this._head?.value) {
            this._head = nextNode;
        }
        if (node.value === this._tail?.value) {
            this._tail = prevNode;
        }
        this._length--;
        return node.value;
    }

    private createNode(value: T): ListNode<T> {
        return {
            value,
        };
    }

    private linkNodes(nodeA?: ListNode<T>, nodeB?: ListNode<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }
}
