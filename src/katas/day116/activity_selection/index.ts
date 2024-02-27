/**
 * Selects the maximum number of activities that don't overlap with each other.
 *
 * @param {Activity[]} activities - An array of activities represented by their start and end times.
 * @returns {Activity[]} An array of selected activities that don't overlap.
 */
export function activitySelection(activities: Activity[]): Activity[] {
    const arr: Activity[] = [...activities].sort((a, b) => a.end - b.end);
    const result: Activity[] = [];
    let lastEnd = 0;

    for (const activity of arr) {
        if (activity.start >= lastEnd) {
            result.push(activity);
            lastEnd = activity.end;
        }
    }

    return result;
}

/**
 * Represents an activity with a start and end time.
 */
export interface Activity {
    start: number;
    end: number;
}
