export default class ArrayList<T> {
    private _length: number;
    private _capacity: number;
    private _arr: T[];

    public get length(): number {
        return this._length;
    }

    constructor(length = 2 ^ 10) {
        this._capacity = length;
        this._length = 0;
        this._arr = new Array(length);
    }

    prepend(item: T): void {
        if (this.isFull()) {
            this.resize();
        }
        const arr = this._arr;
        for (let i = this.length; i > 0; i--) {
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        }
        arr[0] = item;
        this._length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx >= this._capacity) {
            this.resize(idx + 1);
        }
        if (idx >= this.length) {
            this._length = idx + 1;
        }
        this._arr[idx] = item;
    }

    append(item: T): void {
        if (this.isFull()) {
            this.resize();
        }
        this._arr[this.length] = item;
        this._length++;
    }

    remove(item: T): T | undefined {
        const arr = this._arr
        let value: T | undefined = undefined
        let currIdx = -1
        while(currIdx < this.length && value !== item){
            currIdx++
            value = arr[currIdx]
        }
        if(currIdx >= this.length){
            return undefined
        }
        return this.removeAt(currIdx)
    }
    get(idx: number): T | undefined {
        const index = this.getIndex(idx);
        if (index === undefined) {
            return;
        }
        return this._arr[index];
    }
    removeAt(idx: number): T | undefined {
        const arr = this._arr;
        const index = this.getIndex(idx);
        if (index === undefined) {
            return undefined;
        }
        let item: T | undefined = arr[index];
        for (let i = 0; i < this.length - 1; i++) {
            if (i >= index) {
                arr[i] = arr[i + 1];
            }
        }
        this._length--;
        return item;
    }

    private isFull(): boolean {
        return this._length === this._capacity;
    }

    private resize(newCapacity = this._capacity * 2): void {
        const newArr: T[] = new Array(newCapacity);
        for (let i = 0; i < this.length; i++) {
            newArr[i] = this._arr[i];
        }
        this._arr = newArr;
        this._capacity = newCapacity;
    }

    private getIndex(idx: number): number | undefined {
        if (Math.abs(idx) >= this.length) {
            return undefined;
        }
        return idx < 0 ? this.length + idx : idx;
    }
}
