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
        // prepend: add node to the head of the list
        const node = this.createNode(item);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            this.linkNodes(node, this._head);
            this._head = node;
        }
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        // Go to the specified index
        // Create new node
        // Move node at idx to the next idx
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.length - 1) {
            return this.append(item);
        }
        let currIdx = 0;
        let currNode = this._head;
        while (currIdx < idx && currNode) {
            currNode = currNode.next;
            currIdx++;
        }
        if (!currNode) {
            return;
        }
        const node = this.createNode(item);
        const prevNode = currNode.prev;
        const nextNode = currNode;
        this.linkNodes(prevNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }
    append(item: T): void {
        const node = this.createNode(item);
        if (!this._tail) {
            this._head = node;
            this._tail = node;
        } else {
            this.linkNodes(this._tail, node);
            this._tail = node;
        }
        this._length++;
    }
    remove(item: T): T | undefined {
        if (!this._head) {
            return;
        }
        if (this._head.value === item) {
            return this.removeHead();
        }
        if (this._tail?.value === item) {
            return this.removeTail();
        }
        let node: ListNode<T> | undefined = this._head;
        while (node && node.value !== item) {
            node = node.next;
        }
        if (!node) {
            return;
        }
        const prevNode = node.prev;
        const nextNode = node.next;
        this.linkNodes(prevNode, nextNode);
        this._length--;
        return node.value
    }
    get(idx: number): T | undefined {
        let currIdx = 0;
        let node = this._head;
        while (currIdx < idx && node) {
            node = node.next;
            currIdx++;
        }
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            return this.removeHead();
        }
        if (idx === this.length - 1) {
            return this.removeTail();
        }
        let node = this._head;
        let currIdx = 0;
        while (currIdx < idx && node) {
            node = node.next;
            currIdx++;
        }
        if (!node) {
            return;
        }
        this.linkNodes(node.prev, node.next);
        this._length--;
        return node.value
    }

    private createNode(item: T): ListNode<T> {
        return {
            value: item,
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

    private removeHead(): T | undefined {
        if (!this._head) {
            return;
        }
        const oldHead = this._head;
        this.linkNodes(undefined, oldHead.next);
        this._head = oldHead.next;
        if (this._head === undefined) {
            this._tail = undefined;
        }
        this._length--;
        return oldHead?.value;
    }

    private removeTail(): T | undefined {
        if (!this._tail) {
            return;
        }
        const oldTail = this._tail;
        this.linkNodes(oldTail.prev, undefined);
        this._tail = oldTail.prev;
        if (this._tail === undefined) {
            this._head = undefined;
        }
        this._length--;
        return oldTail?.value;
    }
}
