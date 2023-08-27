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

function qs(arr: number[], low: number, high: number) {
    if (low > high) {
        return arr;
    }
    const pivot = arr[high];
    let idx = low - 1;
    for (let i = low; i < high; i++) {
        if (arr[i] <= pivot) {
            idx++;
            [arr[i], arr[idx]] = [arr[idx], arr[i]];
        }
    }
    idx++;
    [arr[idx], arr[high]] = [arr[high], arr[idx]];
    qs(arr, low, idx - 1);
    qs(arr, idx + 1, high);
    return arr;
}

export default quickSort;
