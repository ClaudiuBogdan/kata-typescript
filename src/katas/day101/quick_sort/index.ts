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

const quickSort = (arr: number[]): number[] => {
    return qs(arr, 0, arr.length - 1);
};

function qs(arr: number[], lo: number, hi: number): number[] {
    if (lo >= hi) {
        return arr;
    }

    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);

    return arr;
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivotVal = arr[hi];
    let idx = lo - 1;
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivotVal) {
            idx++;
            [arr[idx], arr[i]] = [arr[i], arr[idx]];
        }
    }
    idx++;
    [arr[idx], arr[hi]] = [arr[hi], arr[idx]];
    return idx;
}

export default quickSort;
