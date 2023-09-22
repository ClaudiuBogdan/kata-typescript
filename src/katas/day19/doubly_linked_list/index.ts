export default class DoublyLinkedList<T> {
    private _length: number;
    private _head: ListNode<T> | undefined;
    private _tail: ListNode<T> | undefined;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = undefined;
        this._tail = undefined;
    }

    prepend(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(node, this._head);
        this._head = node;
        if (this.length === 0) {
            this._tail = node;
        }
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.length) {
            return this.append(item);
        }
        if (idx < 0 || idx > this.length) {
            throw new Error("Invalid idx");
        }
        let currIdx = 0;
        let currNode = this._head;
        while (currIdx < idx) {
            currNode = currNode?.next;
            currIdx++;
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
        this.linkNodes(node.prev, node.next);
        if (this._head === node) {
            this._head = node.next;
        }
        if (this._tail === node) {
            this._tail = node.prev;
        }
        this._length--;
        return node.value;
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let node = this._head;
        let currIdx = 0;
        while (currIdx < idx) {
            node = node?.next;
            currIdx++;
        }
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return;
        }
        let node = this._head;
        let currIdx = 0;
        while (currIdx < idx) {
            node = node?.next;
            currIdx++;
        }
        if (!node) {
            return;
        }
        if (this._head === node) {
            this._head = node.next;
        }
        if (this._tail === node) {
            this._tail = node.prev;
        }
        const prevNode = node.prev;
        const nextNode = node.next;
        this.linkNodes(prevNode, nextNode);
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
