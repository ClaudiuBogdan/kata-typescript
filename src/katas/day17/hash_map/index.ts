/**
 * @class Map
 * @description Map data structure
 */
export default class Map<T extends string | number, V> {
    private _size: number;
    private _capacity: number;
    private _list: HashItem<T, V>[][];

    constructor(capacity = 2 ^ 10) {
        this._capacity = capacity > 0 ? capacity : 2 ^ 10;
        this._size = 0;
        this._list = new Array(this._capacity);
    }

    set(key: T, item: V): void {
        this.checkAndUpdateCapacity();
        const hashItem = {
            key,
            value: item,
        };
        const idx = this.getHashIndex(key);
        const items = this._list[idx] ?? [];
        items.push(hashItem);
        this._list[idx] = items;
        this._size++;
    }

    get(key: T): V | undefined {
        const idx = this.getHashIndex(key);
        const items = this._list[idx] ?? [];
        const item = items.find((e) => e.key === key);
        return item?.value;
    }

    delete(key: T): V | undefined {
        const idx = this.getHashIndex(key);
        const items = this._list[idx];
        if (!items) {
            return;
        }
        const item = items.find((e) => e.key === key);
        if (item) {
            this._list[idx] = items.filter((e) => e.key !== key);
            this._size--;
        }
        return item?.value;
    }

    size(): number {
        return this._size;
    }

    private checkAndUpdateCapacity(): void {
        const threshold = 0.7;
        const currentRation = this._size / this._capacity;
        if (currentRation > threshold) {
            this.updateCapacity(this._capacity * 2);
        }
    }

    private updateCapacity(newCapacity: number): void {
        // Create a new array with the new capacity and add all the existing elements to the new array
        const oldList = this._list;
        this._list = new Array(newCapacity);
        this._capacity = newCapacity;
        for (let oldItems of oldList) {
            if (oldItems === undefined) {
                continue;
            }
            for (let item of oldItems) {
                const idx = this.getHashIndex(item.key);
                const items = this._list[idx] ?? [];
                this._list[idx] = items;
                items.push(item);
            }
        }
    }

    private getHashIndex(key: T): number {
        if (typeof key === "number") {
            return (key * 31) % this._capacity;
        } else if (typeof key === "string") {
            const number = key
                .split("")
                .map((ch) => ch.charCodeAt(0))
                .reduce((acc, prev) => acc + prev);
            return (number * 31) % this._capacity;
        } else {
            return Number(key) % this._capacity;
        }
    }
}

type HashItem<T extends string | number, V> = {
    key: T;
    value: V;
};
