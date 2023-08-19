/**
 * @function quickSort
 * @link https://github.com/TheAlgorithms/TypeScript/blob/aab3f3065ae4e0497acaa2a6212ca1d40dcf2134/sorts/quick_sort.ts
 * @description is an algorithm based on divide and conquer approach in which an array is split into sub-arrays and these sub arrays are recursively sorted to get final array
 * @see [Quick Sort](https://www.javatpoint.com/quick-sort)
 *
 * @param {number[]} array
 * @returns {number[]}
 * @complexity_analysis
 * Space complexity - O(nlogn)
 * Time complexity
 *      Best case   -   O(nlogn)
 *                      When pivot element lies in the middle of the list
 *      Worst case  -   O(n^2)
 *                      When pivot element lies on the extreme ends
 *      Average case -  O(nlogn)
 *                      When the above two cases are not met
 */

const quickSort = (arr: number[]): number[] =>
    recursiveQuickSort(arr, 0, arr.length - 1);

function recursiveQuickSort(
    arr: number[],
    low: number,
    heigh: number,
): number[] {
    if (low > heigh) {
        return arr;
    }

    const pivotIndex = partition(arr, low, heigh);
    recursiveQuickSort(arr, low, pivotIndex - 1);
    recursiveQuickSort(arr, pivotIndex + 1, heigh);
    return arr;
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

export default quickSort;
