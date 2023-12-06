# Insertion Sort

Insertion sort is a simple and intuitive comparison-based sorting algorithm that builds the final sorted array one element at a time. It's best suited for small lists or for lists that are already partially sorted. Here's a detailed look at what insertion sort is and how it works:

## Basic Principle

Insertion sort works by dividing the input into a sorted and an unsorted region, and iteratively moving elements from the unsorted region to the sorted region, placing them in their correct position.

## Algorithm Steps

1. **Initialize Sorted Region**: Start with the first element as the sorted region, as a single element is always sorted.
2. **Iterate Through Unsorted Region**: Iterate through the remaining elements in the unsorted region.
3. **Select Element**: Select the next element from the unsorted region.
4. **Find Correct Position**: Compare the selected element with the elements in the sorted region, moving from right to left, to find the correct position where it should be inserted.
5. **Shift Elements**: Shift all elements greater than the selected element to the right by one position to make space for the selected element.
6. **Insert Element**: Insert the selected element into its correct position in the sorted region.
7. **Repeat**: Repeat steps 3-6 until all elements are in the sorted region.

## Example

Consider the array `[5, 2, 9, 1, 5, 6]`. Here's how insertion sort would sort this array:

1. `[5, 2, 9, 1, 5, 6]` (5 is considered sorted)
2. `[2, 5, 9, 1, 5, 6]` (2 is inserted before 5)
3. `[2, 5, 9, 1, 5, 6]` (9 is already in the correct position)
4. `[1, 2, 5, 9, 5, 6]` (1 is inserted at the beginning)
5. `[1, 2, 5, 5, 9, 6]` (5 is inserted before 9)
6. `[1, 2, 5, 5, 6, 9]` (6 is inserted before 9)

## Advantages

-   **Simple**: Insertion sort is easy to understand and implement.
-   **Efficient for Small Lists**: It has good performance for small lists or nearly sorted lists.
-   **Stable**: It maintains the relative order of equal elements.
-   **In-Place**: It sorts the elements within the array and requires only a constant amount of additional memory.

## Disadvantages

-   **Not Suitable for Large Lists**: With a time complexity of \(O(n^2)\), it becomes inefficient for large lists.

## Conclusion

Insertion sort is a straightforward sorting algorithm that builds a sorted array by repeatedly selecting elements and inserting them into their correct positions. While not suitable for sorting large random lists, it can be very efficient for small or nearly sorted lists. Its simplicity and stability make it a useful algorithm in various contexts, and it's often taught as an introductory sorting algorithm in computer science courses.
