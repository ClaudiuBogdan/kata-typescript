type Node<T> = {
    value: T;
    next?: Node<T>;
};
export default class SinglyLinkedList<T> {
    private _length: number;
    private _head: Node<T> | undefined;
    private _tail: Node<T> | undefined;

    public get length() {
        return this._length;
    }

    constructor() {
        this._length = 0;
    }

    prepend(item: T): void {
        if (!this._head) {
            this._head = {
                value: item,
            };
            this._tail = this._head;
        } else {
            const oldHead = this._head;
            this._head = {
                value: item,
                next: oldHead,
            };
        }
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        const node = this.getNodeByIndex(idx - 1);
        if (!node) {
            throw new Error("No node at index: " + idx);
        }

        const oldNext = node.next;
        node.next = {
            value: item,
            next: oldNext,
        };

        if (oldNext === undefined) {
            this._tail = node.next;
        }
        this._length++;
    }

    append(item: T): void {
        if (!this._tail) {
            return this.prepend(item);
        }
        const oldTail = this._tail;
        oldTail.next = {
            value: item,
        };
        this._tail = oldTail.next;
        this._length++
    }
    remove(item: T): T | undefined {
        if (this._head?.value === item) {
            this._head = this._head?.next;
            this._tail = this._head === undefined ? undefined : this._tail;
            this._length--
            return item;
        }
        let prevNode = this._head;
        do {
            if (prevNode?.next?.value === item) {
                break;
            }
            prevNode = prevNode?.next;
        } while (prevNode !== undefined);

        if (prevNode === undefined || prevNode.next === undefined) {
            return undefined;
        }

        const removedNode = prevNode.next;

        if (this._tail === removedNode) {
            this._tail = prevNode;
        }

        prevNode.next = removedNode.next;
        this._length--


        return removedNode.value;
    }
    get(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        if (!node) {
            return undefined;
        }
        return this.remove(node.value);
    }

    private getNodeByIndex(idx: number): Node<T> | undefined {
        let currentIndex = 0;
        let node = this._head;
        do {
            if (currentIndex === idx) {
                return node;
            }
            currentIndex++;
            node = node?.next;
        } while (node !== undefined);

        return undefined;
    }
}
