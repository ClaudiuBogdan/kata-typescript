/**
 * @function insertionSort
 * @description Insertion sort is an algorithm that sorts an array by iterating through it and inserting each element into its correct position in a sorted subarray. It works by comparing each element with the previous elements in the subarray and shifting them to the right until the correct position is found for the current element.
 * @see https://algorithm-visualizer.org/brute-force/insertion-sort
 * @see https://www.geeksforgeeks.org/insertion-sort/
 * @param arr
 */
export default function insertionSort(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 1; j--) {
            if (arr[j - 1] > arr[j]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
    }
}
