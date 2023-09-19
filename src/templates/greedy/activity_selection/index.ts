/**
 * Represents an activity with a start and end time.
 */
export interface Activity {
    start: number;
    end: number;
}

/**
 * Selects the maximum number of activities that don't overlap with each other.
 *
 * @param {Activity[]} activities - An array of activities represented by their start and end times.
 * @returns {Activity[]} An array of selected activities that don't overlap.
 *
 * @example
 * const activities = [
 *   { start: 1, end: 2 },
 *   { start: 3, end: 4 },
 *   { start: 0, end: 6 },
 *   { start: 5, end: 7 },
 *   { start: 8, end: 9 },
 *   { start: 5, end: 9 }
 * ];
 * activitySelection(activities);  // returns [{ start: 1, end: 2 }, { start: 3, end: 4 }, { start: 5, end: 7 }, { start: 8, end: 9 }]
 */
export function activitySelection(activities: Activity[]): Activity[] {
    // Function implementation here
}
