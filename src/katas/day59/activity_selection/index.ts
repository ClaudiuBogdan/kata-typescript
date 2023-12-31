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
 */
export function activitySelection(activities: Activity[]): Activity[] {
    // Sort the activities
    const sortedActivities = [...activities].sort((a, b) => a.end - b.end);

    const selectedActivities: Activity[] = [];
    let lastEndTime = -1;

    for (const activity of sortedActivities) {
        if (activity.start >= lastEndTime) {
            selectedActivities.push(activity);
            lastEndTime = activity.end;
        }
    }

    return selectedActivities;
}
