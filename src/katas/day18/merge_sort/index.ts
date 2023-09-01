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
    const merge = (
        arr: number[],
        lo1: number,
        hi1: number,
        lo2: number,
        hi2: number,
    ): number[] => {
        const sortedArr: number[] = [];
        const lo = lo1;
        const hi = hi2;
        while (lo1 <= hi1 && lo2 <= hi2) {
            if (arr[lo1] < arr[lo2]) {
              sortedArr.push(arr[lo1])
              lo1++
            } else {
              sortedArr.push(arr[lo2])
              lo2++
            }
        }
        if(lo1 <= hi1){
          for(let i = lo1; i <= hi1; i++){
            sortedArr.push(arr[i])
          }
        }
        if(lo2 <= hi2){
          for(let i = lo2; i <= hi2; i++){
            sortedArr.push(arr[i])
          }
        }
        for(let i = lo; i <= hi; i++){
          arr[i] = sortedArr[i - lo]
        }
        return arr;
    };
    const sort = (arr: number[], lo: number, hi: number): number[] => {
        if (lo >= hi) {
            return arr;
        }
        const middle = lo + Math.floor((hi - lo) / 2);
        sort(arr, lo, middle);
        sort(arr, middle + 1, hi);
        return merge(arr, lo, middle, middle + 1, hi);
    };
    return sort(arr, 0, arr.length - 1)
}
