/**
 * @class Map 
 * @description Map data structure
 */
export default class Map<T extends string | number, V> {
    private capacity: number;
    private len: number;
    private arr: { key: T; value: V }[][];

    constructor() {
        this.capacity = 2 * 10;
        this.len = 0;
        this.arr = Array.from({ length: this.capacity }, () => []);
    }

    get(key: T): V | undefined {
        const idx = this.getHashIdx(key);
        const list = this.arr[idx];
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                return list[i].value;
            }
        }
        return undefined;
    }

    set(key: T, value: V): void {
        if (this.get(key) !== undefined) {
            return;
        }
        const item = { key, value };
        const idx = this.getHashIdx(key);
        this.arr[idx].push(item);
        this.len++;
        if (this.isFull()) {
            this.resizeCapacity();
        }
    }

    delete(key: T): V | undefined {
        const idx = this.getHashIdx(key);
        const list = this.arr[idx];
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                const value = list[i].value;
                list.splice(i, 1);
                this.len--;
                return value;
            }
        }
        return undefined;
    }

    size(): number {
        return this.len;
    }

    private getHashIdx(key: string | number): number {
        if (typeof key === "number") {
            return (Math.abs(key) * 31) % this.capacity;
        }
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            const char = key.charCodeAt(i);
            hashValue = (hashValue << 5) - hashValue + char;
        }
        return Math.abs(hashValue) % this.capacity;
    }

    private isFull(): boolean {
        return this.len >= this.capacity;
    }

    private resizeCapacity(): void {
        const newCap = this.capacity * 2;
        const newArr: { key: T; value: V }[][] = Array.from(
            { length: newCap },
            () => [],
        );
        this.capacity = newCap;
        for (const list of this.arr) {
            for (const item of list) {
                const idx = this.getHashIdx(item.key);
                newArr[idx].push(item);
            }
        }
        this.arr = newArr;
    }
}
