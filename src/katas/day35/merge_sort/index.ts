/**
 * @function mergeSort
 * @description keeps on dividing the list into equal halves until it can no more be divided. By definition, if it is only one element in the list, it is sorted.
 * @link https://github.com/TheAlgorithms/TypeScript/blob/2603b2245ce073e18f096d3484335eb12b9d072c/sorts/merge_sort.ts#L1
 * @see [Merge Sort](https://www.javatpoint.com/merge-sort)
 * @example MergeSort([8, 3, 5, 1, 4, 2]) = [1, 2, 3, 4, 5, 8]
 * @Complexity_Analysis
 * Space complexity - O(n)
 * Time complexity
 *      Best case   -   O(nlogn)
 *      Worst case  -   O(nlogn)
 *      Average case -  O(nlogn)
 *
 * Merge Sort is a recursive algorithm and time complexity can be expressed as following recurrence relation.
 * T(n) = 2T(n/2) + O(n)
 */

export default function sort(arr: number[]): number[] {
    const sortedArr = new Array(arr.length);
    mergeSort(arr, sortedArr, 0, arr.length - 1);
    return sortedArr;
}

function mergeSort(
    arr: number[],
    sortedArr: number[],
    lo: number,
    hi: number,
): void {
    if (hi <= lo) {
        return;
    }
    const middle = lo + Math.floor((hi - lo) / 2);
    mergeSort(arr, sortedArr, lo, middle);
    mergeSort(arr, sortedArr, middle + 1, hi);
    merge(arr, sortedArr, lo, middle, hi);
}

function merge(
    arr: number[],
    sortedArr: number[],
    lo: number,
    middle: number,
    hi: number,
): void {
    let left = lo;
    let right = middle + 1;
    let idx = lo;
    while (left <= middle && right <= hi) {
        if (arr[left] < arr[right]) {
            sortedArr[idx] = arr[left];
            left++;
        } else {
            sortedArr[idx] = arr[right];
            right++;
        }
        idx++;
    }
    while (left <= middle) {
        sortedArr[idx] = arr[left];
        left++;
        idx++;
    }
    while (right <= hi) {
        sortedArr[idx] = arr[right];
        right++;
        idx++;
    }
    for (let i = lo; i <= hi; i++) {
        arr[i] = sortedArr[i];
    }
}
