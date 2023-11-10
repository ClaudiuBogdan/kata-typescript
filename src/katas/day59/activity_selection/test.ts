import { activitySelection, Activity } from "./index";

describe("Activity Selection Greedy Algorithm", () => {
    test("should return an empty array for no activities", () => {
        expect(activitySelection([])).toEqual([]);
    });

    test("should return the same array for a single activity", () => {
        const activities: Activity[] = [{ start: 1, end: 2 }];
        expect(activitySelection(activities)).toEqual(activities);
    });

    test("should return the maximum set of non-overlapping activities", () => {
        const activities: Activity[] = [
            { start: 1, end: 2 },
            { start: 3, end: 4 },
            { start: 0, end: 6 },
            { start: 5, end: 7 },
            { start: 8, end: 9 },
            { start: 5, end: 9 },
        ];
        const expected: Activity[] = [
            { start: 1, end: 2 },
            { start: 3, end: 4 },
            { start: 5, end: 7 },
            { start: 8, end: 9 },
        ];
        expect(activitySelection(activities)).toEqual(expected);
    });
});
