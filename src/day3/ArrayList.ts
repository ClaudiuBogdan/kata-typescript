export default class ArrayList<T> {
    private _length: number;
    private _array: Array<T>;

    public get length() {
        return this._length;
    }

    constructor(length = 0) {
        this._array = Array.from({ length });
        this._length = 0;
    }

    prepend(item: T): void {
        this._array = [item, ...this._array];
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx >= this.length) {
            return;
        }

        const emptyArray = [] as Array<T>;
        this._array = emptyArray
            .concat(this._array.slice(0, idx))
            .concat(item)
            .concat(this._array.slice(idx, this.length));
    }
    append(item: T): void {
        this._array = this._array.slice(0, this.length).concat(item);
        this._length++;
    }
    remove(item: T): T | undefined {
        let index = 0;
        for (; index < this.length && this._array[index] !== item; index++) {}
        if (index === this.length) {
            return undefined;
        }
        return this.removeAt(index);
    }
    get(idx: number): T | undefined {
        return this._array[idx];
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        const element = this._array[idx];
        const emptyArray = [] as Array<T>;
        this._array = emptyArray
            .concat(this._array.slice(0, idx))
            .concat(this._array.slice(idx + 1, this.length));

        this._length--;
        return element;
    }
}
