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

    it("should return an empty array when input is empty", () => {
        expect(activitySelection([])).toEqual([]);
    });

    it("should return the same array when only one activity is given", () => {
        expect(activitySelection([{ start: 1, end: 2 }])).toEqual([
            { start: 1, end: 2 },
        ]);
    });

    it("should return all activities when there is no overlap", () => {
        const activities = [
            { start: 1, end: 3 },
            { start: 3, end: 5 },
            { start: 5, end: 7 },
        ];
        expect(activitySelection(activities)).toEqual(activities);
    });

    it("should return one activity when all activities overlap", () => {
        const activities = [
            { start: 1, end: 4 },
            { start: 2, end: 5 },
            { start: 3, end: 6 },
        ];
        expect(activitySelection(activities).length).toBe(1);
    });

    it("should return the maximum number of non-overlapping activities", () => {
        const activities = [
            { start: 1, end: 3 },
            { start: 2, end: 4 },
            { start: 3, end: 5 },
            { start: 5, end: 7 },
        ];
        expect(activitySelection(activities)).toEqual([
            { start: 1, end: 3 },
            { start: 3, end: 5 },
            { start: 5, end: 7 },
        ]);
    });

    it("should handle activities with the same start and end times correctly", () => {
        const activities = [
            { start: 1, end: 3 },
            { start: 1, end: 3 },
            { start: 3, end: 5 },
        ];
        expect(activitySelection(activities)).toEqual([
            { start: 1, end: 3 },
            { start: 3, end: 5 },
        ]);
    });

    it("should perform well with a large number of activities", () => {
        const activities = Array.from({ length: 1000 }, (_, i) => ({
            start: i,
            end: i + 1,
        }));
        expect(activitySelection(activities)).toEqual(activities);
    });
});
