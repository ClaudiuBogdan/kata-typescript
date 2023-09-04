type ListNode<T> = {
    value: T;
    next?: ListNode<T>;
};

export default class SinglyLinkedList<T> {
    private _length: number;
    private _head: ListNode<T> | undefined;

    public get length(): number {
        return this._length;
    }

    constructor() {
        this._length = 0;
        this._head = undefined;
    }

    prepend(item: T): void {
        const node = this.createNode(item);
        this.linkNodes(node, this._head);
        this._head = node;
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx > this.length) {
            return;
        }
        let prevNode = this._head;
        let prevIdx = 0;
        while (prevIdx < idx - 1) {
            prevNode = prevNode?.next;
            prevIdx++;
        }
        if (!prevNode) {
            throw new Error(
                "Internal implementation error. PrevNode value is undefined",
            );
        }
        const nextNode = prevNode.next;
        const node = this.createNode(item);
        this.linkNodes(prevNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }
    append(item: T): void {
        this.insertAt(item, this.length);
    }
    remove(item: T): T | undefined {
        if (this._head?.value === item) {
            this._head = this._head.next;
            this._length--;
            return item;
        }
        let prevNode: ListNode<T> | undefined = this._head;
        while (prevNode) {
            if (prevNode.next?.value === item) {
                break;
            } else {
                prevNode = prevNode.next;
            }
        }
        if (!prevNode) {
            return;
        }
        const node = prevNode.next;
        if (!node) {
            return;
        }
        const nextNode = node.next;
        node.next = undefined;
        this.linkNodes(prevNode, nextNode);
        this._length--;
        return item;
    }
    get(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            return;
        }
        let currIdx = 0;
        let currNode = this._head;
        while (currIdx < idx) {
            currNode = currNode?.next;
            currIdx++;
        }
        return currNode?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            return;
        }
        if (idx === 0) {
            const item = this._head?.value;
            this._head = this._head?.next;
            this._length--;
            return item;
        }
        let prevNode = this._head;
        let prevIdx = 0;
        while (prevIdx < idx - 1) {
            prevNode = prevNode?.next;
            prevIdx--;
        }
        if (!prevNode) {
            throw new Error("Remove at interval error. No prev node value");
        }
        const node = prevNode.next;
        const nextNode = node?.next;
        this.linkNodes(prevNode, nextNode);
        this._length--;
        return node?.value;
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
