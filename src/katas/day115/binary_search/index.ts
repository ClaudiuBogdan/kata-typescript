/**
 * @function binarySearch
 * @description binary search algorithm (iterative & recursive implementations) for a sorted array.
 * @link https://github.com/TheAlgorithms/TypeScript/blob/aab3f3065ae4e0497acaa2a6212ca1d40dcf2134/search/binary_search.ts
 *
 * The algorithm searches for a specific value in a sorted array in logarithmic time.
 * It repeatedly halves the portion of the list that could contain the item,
 * until you've narrowed down the possible indices to just one.
 *
 * @param {number[]} arr - sorted list of numbers
 * @param {number} target - target number to search for
 * @return {number} - index of the target number in the list, or -1 if not found
 * @see [BinarySearch](https://www.geeksforgeeks.org/binary-search/)
 * @example binarySearch([1,2,3], 2) => 1
 * @example binarySearch([4,5,6], 2) => -1
 */

const binarySearch = (arr: number[], target: number): number => {
    return bs(arr, 0, arr.length - 1, target);
};

function bs(arr: number[], lo: number, hi: number, target: number): number {
    if (lo > hi) {
        return -1;
    }

    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) {
        return mid;
    }

    if (target < arr[mid]) {
        return bs(arr, lo, mid - 1, target);
    } else {
        return bs(arr, mid + 1, hi, target);
    }
}

export default binarySearch;
