import findBreakingFloor from "./index";

describe("two crystal balls", function () {
    test("findBreakingFloor should return correct number of drops", () => {
        expect(findBreakingFloor(67)).toBe(12);
        expect(findBreakingFloor(1)).toBe(1);
        expect(findBreakingFloor(15)).toBe(5);
        expect(findBreakingFloor(100)).toBe(14);
        expect(findBreakingFloor(500)).toBe(32);
        expect(findBreakingFloor(45)).toBe(9);
    });

    test("findBreakingFloor should return 0 for invalid inputs", () => {
        expect(findBreakingFloor(0)).toBe(0);
    });
});
