/**
 * Selects the maximum number of activities that don't overlap with each other.
 *
 * @param {Activity[]} activities - An array of activities represented by their start and end times.
 * @returns {Activity[]} An array of selected activities that don't overlap.
 */
export function activitySelection(activities: Activity[]): Activity[] {
    const sortedActivities = activities.sort((a, b) => a.end - b.end);
    let lastEndTime = -Infinity;
    const result: Activity[] = [];

    for (const activity of sortedActivities) {
        if (activity.start >= lastEndTime) {
            lastEndTime = activity.end;
            result.push(activity);
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
