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
    return mergeSortRecurs(arr, 0, arr.length - 1);
}

function mergeSortRecurs(arr: number[], low: number, high: number): number[] {
    const middle = low + Math.floor((high - low) / 2);
    if (low < high) {
        mergeSortRecurs(arr, low, middle);
        mergeSortRecurs(arr, middle + 1, high);
    }
    //Merge sorted arrays
    let left = low;
    let right = middle + 1;
    const tmpArr = arr.slice(low, high + 1);
    for (let i = low; i <= high; i++) {
        const leftIndex = left - low;
        const rightIndex = right - low;
        let value = tmpArr[leftIndex];
        if (
            right > high ||
            (left <= middle && tmpArr[leftIndex] < tmpArr[rightIndex])
        ) {
            left++;
        } else {
            value = tmpArr[rightIndex];
            right++;
        }
        arr[i] = value;
    }
    return arr;
}
