export default function quick_sort(arr: number[]): void {
    recursiveQuickSort(arr, 0, arr.length - 1);
}

function recursiveQuickSort(arr: number[], low: number, heigh: number): void {
    if (low > heigh) {
        return;
    }

    const pivotIndex = partition(arr, low, heigh);
    recursiveQuickSort(arr, low, pivotIndex - 1);
    recursiveQuickSort(arr, pivotIndex + 1, heigh);
}

function partition(arr: number[], low: number, heigh: number): number {
    const pivot = arr[heigh];
    let idx = low - 1;
    for (let i = low; i < heigh; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = tmp;
        }
    }
    idx++;
    const tmp = arr[idx];
    arr[idx] = arr[heigh];
    arr[heigh] = tmp;

    return idx;
}
