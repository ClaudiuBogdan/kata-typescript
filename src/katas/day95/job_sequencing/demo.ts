export interface Job {
    id: string;
    deadline: number;
    profit: number;
}
export function jobSequencing(jobs: Job[]): Job[] {
    // Sort jobs in decreasing order of profit
    jobs.sort((a, b) => b.profit - a.profit);

    // Initialize result array and time slots array
    const result: Job[] = [];
    const timeSlots: boolean[] = Array(jobs.length).fill(false);

    // Iterate through all jobs
    for (let i = 0; i < jobs.length; i++) {
        // Find a free slot for this job
        for (let j = Math.min(jobs.length, jobs[i].deadline) - 1; j >= 0; j--) {
            // If free slot found, add job to result and mark slot as filled
            if (!timeSlots[j]) {
                timeSlots[j] = true;
                result[j] = jobs[i];
                break;
            }
        }
    }

    // Filter out empty slots and return result
    return result.filter((job) => job !== undefined && job.profit > 0);
}
