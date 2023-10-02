# Kadane algorithm

The Max Subarray Problem is a classic computer science problem that asks for the contiguous subarray within a given array of integers that has the largest sum. This problem can be solved using various approaches, but Kadane's Algorithm is one of the most efficient, with a time complexity of \(O(n)\).

Here's the basic idea behind Kadane's Algorithm:

1. **Initialize**: Start with two variables `currentMax` and `globalMax`. Set both to the first element of the array.
2. **Iterate**: Loop through the array starting from the second element.
3. **Update `currentMax`**: For each element, update `currentMax` to be the maximum of the current element and the sum of `currentMax` and the current element.
4. **Update `globalMax`**: Update `globalMax` to be the maximum of `currentMax` and `globalMax`.

Here's a TypeScript code snippet to demonstrate Kadane's Algorithm:

```typescript
function maxSubArray(nums: number[]): number {
    let currentMax: number = nums[0];
    let globalMax: number = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Update the current maximum sum ending at nums[i]
        currentMax = Math.max(nums[i], currentMax + nums[i]);

        // Update the global maximum sum found so far
        globalMax = Math.max(globalMax, currentMax);
    }

    return globalMax;
}

// Test the function
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(array)); // Output should be 6 (subarray is [4, -1, 2, 1])
```

### Explanation:

-   `currentMax` is used to store the maximum subarray sum ending at position \(i\). Initially, it's set to the first element (`nums[0]`).
-   `globalMax` is used to store the maximum subarray sum we have found so far. Initially, it's also set to the first element (`nums[0]`).
-   As we loop through the array starting from the second element, we update `currentMax` and `globalMax` based on the logic of Kadane's algorithm.

This approach ensures we find the maximum sum of any contiguous subarray efficiently, in just a single pass through the array.

## How do you know that the elements are contiguous if we use math.max for the currentMax? Can you go into more details?

Certainly! The use of `Math.max` in the algorithm might be a little counterintuitive at first glance, but it plays a crucial role in ensuring that we're considering contiguous subarrays.

The line `currentMax = Math.max(nums[i], currentMax + nums[i]);` essentially decides whether to extend the current contiguous subarray or start a new one. Here's how:

1. **Extend the current subarray**: When `currentMax + nums[i]` is greater than `nums[i]`, it means that the current element is contributing positively to the existing `currentMax`. Therefore, we extend the subarray to include the current element by setting `currentMax` to `currentMax + nums[i]`.

2. **Start a new subarray**: When `nums[i]` is greater than `currentMax + nums[i]`, it means that the current element alone is better than any previous contiguous subarray that ends at the previous element (i.e., `currentMax`). This starts a new contiguous subarray, and `currentMax` is set to the value of the current element (`nums[i]`).

### An Example:

Let's consider the array `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` as an example.

-   Initialize `currentMax = -2` and `globalMax = -2` (the first element)
-   Loop starts at index 1 (`i = 1`) with value `1`:
    -   `Math.max(1, 1 + (-2)) = Math.max(1, -1) = 1`
    -   `currentMax` becomes `1`
    -   `globalMax` becomes `1`
-   Loop at index 2 (`i = 2`) with value `-3`:
    -   `Math.max(-3, -3 + 1) = Math.max(-3, -2) = -2`
    -   `currentMax` becomes `-2`
    -   `globalMax` remains `1`
-   And so on...

At each step, `currentMax` represents the sum of the maximum contiguous subarray ending at `nums[i]`. And at each step, we update `globalMax` to store the maximum sum we've found so far.

By the end of the loop, `globalMax` will contain the maximum contiguous subarray sum for the entire array.

Does that help clarify how the algorithm ensures the elements are contiguous?
