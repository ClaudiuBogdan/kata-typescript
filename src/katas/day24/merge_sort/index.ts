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
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
    const arr: number[] = [];
    let leftIdx = 0;
    let rightIdx = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
            arr.push(left[leftIdx]);
            leftIdx++;
        } else {
            arr.push(right[rightIdx]);
            rightIdx++;
        }
    }
    if (leftIdx < left.length) {
        arr.push(...left.slice(leftIdx));
    }
    if (rightIdx < right.length) {
        arr.push(...right.slice(rightIdx));
    }
    return arr;
}
