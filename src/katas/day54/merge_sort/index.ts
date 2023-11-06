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

export default function mergeSort(arr: number[]): number[] {
    return mergeSortAux(arr, 0, arr.length);
}

function merge(arr: number[], lo: number, middle: number, hi: number): void {
    const tmpArr: number[] = [];
    let left = lo;
    let right = middle;
    let idx = lo;

    while (left < middle && right < hi) {
        if (arr[left] < arr[right]) {
            tmpArr.push(arr[left]);
            idx++;
            left++;
        } else {
            tmpArr.push(arr[right]);
            idx++;
            right++;
        }
    }
    while (left < middle) {
        tmpArr.push(arr[left]);
        idx++;
        left++;
    }
    while (right < hi) {
        tmpArr.push(arr[right]);
        right++;
        idx++;
    }
    for (let i = 0; i < tmpArr.length; i++) {
        arr[lo + i] = tmpArr[i];
    }
}

function mergeSortAux(arr: number[], lo: number, hi: number): number[] {
    if (lo >= hi - 1) {
        return arr;
    }

    const middle = lo + Math.floor((hi - lo) / 2);

    mergeSortAux(arr, lo, middle);
    mergeSortAux(arr, middle, hi);
    merge(arr, lo, middle, hi);
    return arr;
}
