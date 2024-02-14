/**
 * @function linearSearch
 * @description linear search is the simplest search possible in a array
 *  it has a linear cost, if the value is present in the array, then the index of the first occurence will be returned
 *  if it's not present, the return it will be -1
 * @link https://github.com/TheAlgorithms/TypeScript/blob/6608f5af6e54a4b737666f45989b36acd42b9a79/search/linear_search.ts
 * @param {number[]} array - list of numbers
 * @param {number} target - target number to search for
 * @return {number} - index of the target number in the list, or -1 if not found
 * @see https://en.wikipedia.org/wiki/Linear_search\
 * @example linearSearch([1,2,3,5], 3) => 2
 * @example linearSearch([1,5,6], 2) => -1
 */
export default function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
