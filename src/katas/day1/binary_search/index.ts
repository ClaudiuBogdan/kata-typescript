/**
 * @function binarySearch
 * @description binary search algorithm (iterative & recursive implementations) for a sorted array.
 * @link https://github.com/TheAlgorithms/TypeScript/blob/aab3f3065ae4e0497acaa2a6212ca1d40dcf2134/search/binary_search.ts
 *
 * The algorithm searches for a specific value in a sorted array in logarithmic time.
 * It repeatedly halves the portion of the list that could contain the item,
 * until you've narrowed down the possible indices to just one.
 *
 * @param {number[]} array - sorted list of numbers
 * @param {number} target - target number to search for
 * @return {number} - index of the target number in the list, or -1 if not found
 * @see [BinarySearch](https://www.geeksforgeeks.org/binary-search/)
 * @example binarySearch([1,2,3], 2) => 1
 * @example binarySearch([4,5,6], 2) => -1
 */

const binarySearchIterative = (array: number[], target: number): number => {
    return recursive_binary_search(array, 0, array.length - 1, target);
};

function recursive_binary_search(
    arr: number[],
    leftIndex: number,
    rightIndex: number,
    value: number,
): number {
    if (leftIndex > rightIndex) {
        return -1;
    }
    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    if (arr[middleIndex] === value) {
        return middleIndex;
    }
    if (arr[middleIndex] > value) {
        return recursive_binary_search(arr, leftIndex, middleIndex - 1, value);
    } else {
        return recursive_binary_search(arr, middleIndex + 1, rightIndex, value);
    }
}

export default binarySearchIterative;
