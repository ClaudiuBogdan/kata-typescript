import mergeSort from ".";

describe("Merge Sort", () => {
    it("generating array with variable length and comparing with sorted array", () => {
        let arrLenArr = [10, 200, 40000];

        arrLenArr.forEach((arrLen: number) => {
            let inBuiltSortArr = Array<number>(arrLen);
            for (let i = 0; i < arrLen; i++) {
                inBuiltSortArr[i] = Math.random() * 10000;
            }
            let mergeSortArray = inBuiltSortArr.slice();

            inBuiltSortArr.sort((a, b) => a - b);
            expect(mergeSort(mergeSortArray)).toStrictEqual(inBuiltSortArr);
        });
    });

    test("should sort an array where the smallest elements are initially in the right half", () => {
        const inputArray = [3, 2, 1];
        const expectedOutput = [1, 2, 3];

        expect(mergeSort(inputArray)).toEqual(expectedOutput);
    });

    test("should sort a larger array with a mix of numbers", () => {
        const inputArray = [8, 4, 5, 7, 1, 3, 6, 2];
        const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8];

        expect(mergeSort(inputArray)).toEqual(expectedOutput);
    });
    
});
