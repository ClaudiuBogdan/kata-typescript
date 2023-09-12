type Pair<T, V> = {
    key: T;
    value: V;
};
/**
 * @class Map
 * @description Map data structure
 */
export default class Map<T extends string | number, V> {
    private _size: number;
    private _capacity: number;
    private _list: Pair<T, V>[][];

    constructor() {
        this._size = 0;
        this._capacity = 2 ^ 10;
        this._list = [];
    }

    get(key: T): V | undefined {
        const idx = this.getHashIndex(key);
        const list = this._list[idx] ?? [];
        for (const pair of list) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return undefined;
    }

    set(key: T, value: V): void {
        if (this.isFull()) {
            this.updateCapacity();
        }
        const idx = this.getHashIndex(key);
        const list = this._list[idx] ?? [];
        list.push({ key, value });
        this._list[idx] = list;
        this._size++;
    }

    delete(key: T): V | undefined {
        const idx = this.getHashIndex(key);
        const list = this._list[idx] ?? [];
        const pairIdx = list.findIndex((e) => e.key === key);
        if (pairIdx === -1) {
            return;
        }
        const value = list[pairIdx].value;
        list.splice(pairIdx, 1);
        this._size--;
        return value;
    }

    size(): number {
        return this._size;
    }

    private getHashIndex(key: T, capacity: number = this._capacity): number {
        if (typeof key === "number") {
            return (key * 31) % capacity;
        }
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            const char = key.charCodeAt(i);

            hashValue = (hashValue << 5) - hashValue + char;
        }
        return Math.abs(hashValue) % capacity;
    }

    private isFull(): boolean {
        return this._size >= this._capacity * 0.7;
    }

    private updateCapacity(newCapacity = this._capacity * 2): void {
        const newList = new Array(newCapacity);
        for (const list of this._list) {
            if (!list) continue;
            for (const pair of list) {
                const idx = this.getHashIndex(pair.key, newCapacity);
                const list = newList[idx] ?? [];
                newList[idx] = list;
                list.push(pair);
            }
        }
    }
}
