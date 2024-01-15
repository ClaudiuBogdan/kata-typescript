/**
 * Represents a job with a deadline and profit.
 */
export interface Job {
    id: string;
    deadline: number;
    profit: number;
}

/**
 * Solves the Job Sequencing problem using a greedy approach.
 *
 * @param {Job[]} jobs - An array of jobs with id, deadline, and profit.
 * @returns {Job[]} An array of jobs that maximize the total profit while meeting deadlines.
 *
 * @example
 * const jobs = [
 *   { id: 'a', deadline: 4, profit: 20 },
 *   { id: 'b', deadline: 1, profit: 10 },
 *   { id: 'c', deadline: 1, profit: 40 },
 *   { id: 'd', deadline: 1, profit: 30 }
 * ];
 * jobSequencing(jobs);  // returns [{ id: 'c', deadline: 1, profit: 40 }, { id: 'a', deadline: 4, profit: 20 }]
 */
export function jobSequencing(jobs: Job[]): Job[] {
    jobs.sort((a, b) => b.profit - a.profit);
    const results: Job[] = [];
    const timeSlots: boolean[] = new Array(jobs.length).fill(false);

    for (let i = 0; i < jobs.length; i++) {
        for (let j = Math.min(jobs.length, jobs[i].deadline) - 1; j >= 0; j--) {
            if (!timeSlots[j]) {
                timeSlots[j] = true;
                results[j] = jobs[i];
                break;
            }
        }
    }

    return results.filter((job) => job !== undefined && job.profit > 0);
}
