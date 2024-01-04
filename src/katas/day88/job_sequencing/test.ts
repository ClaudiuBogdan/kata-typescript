import { jobSequencing, Job } from "./index";

describe("Job Sequencing Problem - Greedy Algorithm", () => {
    test("should return an empty array for no jobs", () => {
        expect(jobSequencing([])).toEqual([]);
    });

    test("should return a single job for an array with one job", () => {
        const jobs: Job[] = [{ id: "a", deadline: 1, profit: 10 }];
        expect(jobSequencing(jobs)).toEqual([
            { id: "a", deadline: 1, profit: 10 },
        ]);
    });

    test("should return jobs that maximize profit", () => {
        const jobs: Job[] = [
            { id: "a", deadline: 4, profit: 20 },
            { id: "b", deadline: 1, profit: 10 },
            { id: "c", deadline: 1, profit: 40 },
            { id: "d", deadline: 1, profit: 30 },
        ];
        expect(jobSequencing(jobs)).toEqual([
            { id: "c", deadline: 1, profit: 40 },
            { id: "a", deadline: 4, profit: 20 },
        ]);
    });

    test("should handle jobs with the same deadline", () => {
        const jobs: Job[] = [
            { id: "a", deadline: 1, profit: 20 },
            { id: "b", deadline: 1, profit: 25 },
        ];
        expect(jobSequencing(jobs)).toEqual([
            { id: "b", deadline: 1, profit: 25 },
        ]);
    });

    test("should handle jobs with zero profit", () => {
        const jobs: Job[] = [
            { id: "a", deadline: 1, profit: 0 },
            { id: "b", deadline: 2, profit: 10 },
        ];
        expect(jobSequencing(jobs)).toEqual([
            { id: "b", deadline: 2, profit: 10 },
        ]);
    });
});
