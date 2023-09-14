export default class SinglyLinkedList<T> {
    private _head: ListNode<T> | undefined;
    private _length: number;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._head = undefined;
        this._length = 0;
    }

    prepend(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(node, this._head);
        this._head = node;
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            return;
        }
        if (idx === 0) {
            return this.prepend(item);
        }
        let prevIdx = 0;
        let prevNode = this._head;
        while (prevNode && prevIdx < idx - 1) {
            prevNode = prevNode.next;
            prevIdx++;
        }
        if (!prevNode) {
            return;
        }
        const node = this.createNode(item);
        const nextNode = prevNode.next;
        this.linkNodes(prevNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }
    append(item: T): void {
        return this.insertAt(item, this._length);
    }
    remove(item: T): T | undefined {
        if (this._head?.value === item) {
            const head = this._head;
            this._head = head.next;
            head.next = undefined;
            this._length--;
            return item;
        }
        let prevNode = this._head;
        while (prevNode && prevNode.next && prevNode.next.value !== item) {
            prevNode = prevNode.next;
        }
        if (!prevNode || !prevNode.next) {
            return;
        }
        const node = prevNode.next;
        const nextNode = node.next;
        node.next = undefined;
        this.linkNodes(prevNode, nextNode);
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
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            const head = this._head;
            this._head = this._head?.next;
            this._length--;
            return head?.value;
        }
        let prevIdx = 0;
        let prevNode = this._head;
        while (prevNode && prevIdx < idx - 1) {
            prevNode = prevNode.next;
        }
        if (!prevNode || !prevNode.next) {
            return;
        }
        const node = prevNode.next;
        const nextNode = node.next;
        node.next = undefined;
        this.linkNodes(prevNode, nextNode);
        this._length--;
        return node.value;
    }

    private createNode(value: T): ListNode<T> {
        return {
            value,
        };
    }

    private linkNodes(nodeA: ListNode<T>, nodeB?: ListNode<T>): void {
        nodeA.next = nodeB;
    }
}

type ListNode<T> = {
    value: T;
    next?: ListNode<T>;
};
