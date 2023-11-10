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
    // Sort the activities based on their end times
    activities.sort((a, b) => a.end - b.end);

    const selectedActivities: Activity[] = [];
    let lastSelectedEndTime = -1;

    for (const activity of activities) {
        // If the start time of the current activity is greater than or equal to
        // the end time of the last selected activity, then select this activity
        if (activity.start >= lastSelectedEndTime) {
            selectedActivities.push(activity);
            lastSelectedEndTime = activity.end;
        }
    }

    return selectedActivities;
}
