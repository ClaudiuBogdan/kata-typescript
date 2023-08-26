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
        if (this._head) {
            this.linkNodes(node, this._head);
        }
        this._head = node;
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        let currNode = this._head;
        let currIdx = 0;
        while (currIdx + 1 < idx && currNode) {
            currNode = currNode.next;
            currIdx++;
        }
        if (!currNode) {
            return;
        }
        const node = this.createNode(item);
        const nextNode = currNode.next;
        this.linkNodes(currNode, node);
        this.linkNodes(node, nextNode);
        this._length++;
    }
    append(item: T): void {
        if (!this._head) {
            return this.prepend(item);
        }
        let tail = this._head;
        while (tail.next) {
            tail = tail.next;
        }
        const node = this.createNode(item);
        this.linkNodes(tail, node);
        this._length++;
    }
    get(idx: number): T | undefined {
        let node = this._head;
        let currIdx = 0;
        while (currIdx < idx && node) {
            node = node.next;
            currIdx++;
        }
        return node?.value;
    }
    remove(item: T): T | undefined {
        let node = this._head;
        while (node && node.value !== item) {
            node = node.next;
        }
        if (!node) {
            return undefined;
        }
        const prevNode = node.prev;
        const nextNode = node.next;
        if (node === this._head) {
            this._head = nextNode;
        }
        if (prevNode) {
            prevNode.next = nextNode;
        }
        this._length--;
        return node.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            const oldHead= this._head
            this._head = this._head?.next;
            this._length--;
            return oldHead?.value
        }
        let prevNodeIdx = 0;
        let prevNode = this._head;
        while (prevNodeIdx < idx - 1 && prevNode?.next) {
            prevNode = prevNode.next;
            prevNodeIdx++;
        }
        if (!prevNode || !prevNode.next) {
            return;
        }
        const node = prevNode.next;
        const nextNode = node.next;
        this.linkNodes(prevNode, nextNode)
        
        this._length--;
        return node.value;
    }

    private createNode(
        value: T,
        next?: ListNode<T>,
        prev?: ListNode<T>,
    ): ListNode<T> {
        return {
            value,
            next,
            prev,
        };
    }

    private linkNodes(nodeA: ListNode<T>, nodeB?: ListNode<T>): void {
        if (nodeA) {
            nodeA.next = nodeB;
        }
    }
}
