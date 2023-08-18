type Item<T, V> = {
    key: T;
    value: V;
};

type HashTable<T, V> = (Item<T, V>[] | undefined)[];
/**
 * @class Map
 * @description Map data structure
 */
export default class Map<T extends string | number, V> {
    private static readonly DEFAULT_SIZE = 2 ^ 10;
    private static readonly INCREASE_SIZE_FACTOR = 1.5;
    private _arr: HashTable<T, V>;
    private _size: number;

    constructor() {
        this._arr = new Array(Map.DEFAULT_SIZE);
        this._size = 0;
    }

    get(key: T): V | undefined {
        const index = this.getIndex(key);
        const list = this._arr[index];
        if (list === undefined) {
            return undefined;
        }
        for (let item of list) {
            if (item.key === key) {
                return item.value;
            }
        }
        return undefined;
    }

    set(key: T, value: V): void {
        const capacity = this.getArrayCapacity();
        if (capacity > 0.7) {
            this.increaseArraySize();
        }
        const index = this.getIndex(key);
        const list = this._arr[index] ?? [];
        const oldItemIndex = list?.findIndex((e) => e.key === key);
        if (oldItemIndex === -1) {
            const item: Item<T, V> = {
                key,
                value,
            };
            list.push(item);
        } else {
            list[oldItemIndex].value = value;
        }
        this._arr[index] = list;
        this._size++;
    }

    delete(key: T): V | undefined {
        const index = this.getIndex(key);
        const list = this._arr[index] ?? [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                const value = list[i].value;
                list.splice(i, 1);
                this._size--;
                return value;
            }
        }
        return undefined;
    }

    size(): number {
        return this._size;
    }

    private getIndex(key: T, arraySize = this._arr.length): number {
        const hash = this.generateHash(key);
        return hash % arraySize;
    }

    private getArrayCapacity(): number {
        return this._size / this._arr.length;
    }

    private generateHash(key: T): number {
        if (typeof key === "number") {
            const hash = key;
            return Math.abs(hash);
        }
        if (typeof key === "string") {
            const unicode = key
                .split("")
                .map((ch) => ch.charCodeAt(0))
                .join("");
            const hash = Number.parseInt(unicode);
            return Math.abs(hash);
        }
        throw new Error("Hash for this data type is not supported.");
    }

    private increaseArraySize(): void {
        const newSize = Math.min(
            Math.ceil(this._arr.length * Map.INCREASE_SIZE_FACTOR),
            Number.MAX_SAFE_INTEGER,
        );
        const newArr: HashTable<T, V> = new Array(newSize);
        for (let list of this._arr) {
            if (list === undefined) {
                continue;
            }
            for (let item of list) {
                const index = this.getIndex(item.key, newSize);
                const newList = newArr[index] ?? [];
                newList.push(item);
                newArr[index] = newList
            }
        }
        this._arr = newArr;
    }
}
