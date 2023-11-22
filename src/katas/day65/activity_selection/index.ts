/**
 * Selects the maximum number of activities that don't overlap with each other.
 *
 * @param {Activity[]} activities - An array of activities represented by their start and end times.
 * @returns {Activity[]} An array of selected activities that don't overlap.
 */
export function activitySelection(activities: Activity[]): Activity[] {
    if (activities.length === 0) {
        return [];
    }
    const results: Activity[] = [];
    const sorted = activities.sort((a, b) => a.end - b.end);
    let lastEnd = 0;
    for (const activity of sorted) {
        if (activity.start >= lastEnd) {
            results.push(activity);
            lastEnd = activity.end;
        }
    }
    return results;
}

/**
 * Represents an activity with a start and end time.
 */
export interface Activity {
    start: number;
    end: number;
}
