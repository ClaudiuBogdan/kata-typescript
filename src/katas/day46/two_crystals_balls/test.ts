import findBreakingFloor from "./index";

describe("two crystal balls", function () {
    test("findBreakingFloor should return correct number of drops", () => {
        expect(findBreakingFloor(generateBreaksArray(100, 67))).toBe(14);
        expect(findBreakingFloor(generateBreaksArray(100, 1))).toBe(10);
        expect(findBreakingFloor(generateBreaksArray(100, 100))).toBe(14);
        expect(findBreakingFloor(generateBreaksArray(1000, 500))).toBe(38);
        expect(findBreakingFloor(generateBreaksArray(1000, 999))).toBe(38);
        expect(findBreakingFloor(generateBreaksArray(1000, 1000))).toBe(38);
    });

    test("findBreakingFloor should handle edge cases", () => {
        expect(findBreakingFloor(generateBreaksArray(1, 1))).toBe(1);
        expect(findBreakingFloor(generateBreaksArray(2, 1))).toBe(2);
        expect(findBreakingFloor(generateBreaksArray(2, 2))).toBe(2);
        expect(findBreakingFloor(generateBreaksArray(3, 2))).toBe(2);
        expect(findBreakingFloor(generateBreaksArray(3, 3))).toBe(2);
    });

    test("findBreakingFloor should return 0 for invalid inputs", () => {
        expect(findBreakingFloor(generateBreaksArray(0, 0))).toBe(0);
        expect(findBreakingFloor(generateBreaksArray(-1, -1))).toBe(0);
        expect(findBreakingFloor(generateBreaksArray(100, 101))).toBe(0);
    });
});

function generateBreaksArray(
    totalFloors: number,
    breakFloor: number,
): boolean[] {
    const breaks: boolean[] = new Array(totalFloors).fill(false);
    for (let i = breakFloor - 1; i < totalFloors; i++) {
        breaks[i] = true;
    }
    return breaks;
}
