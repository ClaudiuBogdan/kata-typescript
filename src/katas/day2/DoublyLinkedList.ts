type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;
    private _length: number;

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
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this._length) {
            return this.append(item);
        }
        if (idx > this.length) {
            return;
        }

        const node = this.createNode(item);
        const prevNode = this.getNodeByIndex(idx - 1);
        if (!prevNode) {
            return;
        }
        const nextNode = prevNode.next;
        this.linkNodes(prevNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }
    append(item: T): void {
        if (this.length === 0) {
            return this.prepend(item);
        }
        const node = this.createNode(item);
        this.linkNodes(this._tail, node);
        this._tail = node;
        this._length++;
    }
    remove(item: T): T | undefined {
        const node = this.getNodeByValue(item);
        return this.removeNode(node);
    }
    removeAt(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        return this.removeNode(node);
    }
    get(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        return node?.value;
    }

    private createNode(item: T, next?: Node<T>, prev?: Node<T>): Node<T> {
        return {
            value: item,
            next,
            prev,
        };
    }

    private linkNodes(nodeA?: Node<T>, nodeB?: Node<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
        if (nodeB) {
            nodeB.prev = nodeA;
        }
    }

    private getNodeByIndex(idx: number): Node<T> | undefined {
        // This can be optimized by comparing the idx and the length of the list and traverse the list
        // from the head or the tail depending on the idx
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        let currentIndex = 0;
        let node = this._head;
        while (node && currentIndex < idx) {
            node = node.next;
            currentIndex++;
        }

        return node;
    }

    private getNodeByValue(item: T): Node<T> | undefined {
        let node = this._head;
        while (node && node.value !== item) {
            node = node.next;
        }
        return node;
    }

    private removeNode(node: Node<T> | undefined): T | undefined {
        if (!node) {
            return;
        } else if (this._length === 1) {
            this._head = undefined;
            this._tail = undefined;
        } else if (this._head === node) {
            this._head = this._head.next;
            this.linkNodes(undefined, this._head);
        } else if (this._tail === node) {
            this._tail = this._tail.prev;
            this.linkNodes(this._tail, undefined);
        } else {
            this.linkNodes(node.prev, node.next);
        }

        this._length--;
        return node.value;
    }
}
