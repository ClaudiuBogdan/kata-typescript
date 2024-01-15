# Job Sequencing

The Job Sequencing Problem is an optimization problem where you are given a set of jobs, each with a deadline and profit associated with it. The goal is to schedule the jobs in such a way that you maximize the total profit, under the constraint that each job takes a single unit of time and must be completed before its deadline.

Here's a step-by-step breakdown of a common greedy algorithm used to solve this problem:

1. Sort all jobs in decreasing order of profit.
2. Initialize the result sequence with the first job in the sorted array.
3. Do the following for the remaining jobs in the sorted array:
   - If the current job can fit in the current result sequence without missing the deadline, add it to the result. To check if a job can fit, compare its deadline with all jobs already added to the result sequence.

This algorithm works because it always considers the most profitable jobs first, and only includes a job if it can be completed before its deadline.

Here's a simple implementation in Python:

```python
def JobScheduling(jobs, t):
    # Sort jobs according to decreasing order of profit
    jobs.sort(key = lambda x: x[2], reverse = True)
    
    # To keep track of free time slots
    result = [False] * t
    
    # To store result (Sequence of jobs)
    job = ['-1'] * t
    
    # Iterate through all given jobs
    for i in range(len(jobs)):
        # Find a free slot for this job (Note that we start from the last possible slot)
        for j in range(min(t - 1, jobs[i][1] - 1), -1, -1):
            # Free slot found
            if result[j] is False:
                result[j] = True
                job[j] = jobs[i][0]
                break
                
    # Print the sequence
    print(job)

# Driver code
jobs = [['a', 2, 100],  # Job Array
        ['b', 1, 19],
        ['c', 2, 27],
        ['d', 1, 25],
        ['e', 3, 15]]
        
# Function Call
JobScheduling(jobs, 3)
```

In this code, `jobs` is an array of jobs where each job is represented as an array with three elements - the job name, the deadline for the job, and the profit from the job. The function `JobScheduling` schedules the jobs to maximize profit.

## Implementation explanation

Sure, let's break down the Job Sequencing Problem and its solution in more detail.

**Problem Statement:**
You are given a set of jobs, each with a unique ID, a deadline, and a profit. Each job takes a single unit of time to complete. Your task is to determine the maximum profit that can be earned by scheduling some of the jobs. The only constraint is that a job must be completed before its deadline.

**Algorithm Explanation:**
The algorithm uses a greedy approach, which means it makes the locally optimal choice at each step with the hope that these local choices will lead to a global optimum.

Here are the steps of the algorithm:

1. **Sort all jobs in decreasing order of profit.** This is done because we want to consider jobs with higher profit first.

2. **Initialize the result sequence and a boolean array to keep track of free time slots.** The result sequence will store the scheduled jobs, and the boolean array will indicate which time slots are already filled.

3. **Iterate through all given jobs.** For each job, do the following:

   a. **Find a free slot for this job.** Start from the last possible slot (which is the minimum of the job's deadline and the total number of slots), and move backwards until you find a free slot or reach the beginning of the time slots array.

   b. **If a free slot is found, add the job to the result sequence and mark the slot as filled.** This is done because the current job provides the maximum possible profit among the remaining jobs.

4. **Return the result sequence.** This sequence contains the scheduled jobs that maximize the total profit.

**Implementation Details:**
The implementation in TypeScript follows the above algorithm. Here's a step-by-step breakdown of the code:

1. **Sort the jobs in decreasing order of profit:** `jobs.sort((a, b) => b.profit - a.profit);`

2. **Initialize the result sequence and the time slots array:** `const result: Job[] = [];` and `const timeSlots: boolean[] = Array(jobs.length).fill(false);`

3. **Iterate through all jobs:** `for (let i = 0; i < jobs.length; i++) { ... }`

   a. **Find a free slot for the current job:** `for (let j = Math.min(jobs.length, jobs[i].deadline) - 1; j >= 0; j--) { ... }`

   b. **If a free slot is found, add the job to the result sequence and mark the slot as filled:** `if (!timeSlots[j]) { timeSlots[j] = true; result[j] = jobs[i]; break; }`

4. **Return the result sequence, filtering out any empty slots:** `return result.filter(job => job !== undefined);`

This implementation ensures that the jobs with the highest profit are considered first and that each job is scheduled at the latest possible time slot before its deadline, which allows more jobs to be scheduled and thus maximizes the total profit.

### I don't understand how the time slot works. How is it related to the deadline?

The concept of time slots in this algorithm is used to represent the time at which a job can be scheduled. Each time slot corresponds to a unit of time. If there are 'n' jobs, we consider 'n' time slots.

The deadline of a job is the last time slot by which the job must be completed. For example, if a job has a deadline of 3, it means that the job can be scheduled at time slot 1, 2, or 3.

When scheduling jobs, we try to schedule a job at the latest time slot possible that is less than or equal to its deadline. This is done to leave earlier time slots free for other jobs that may have earlier deadlines.

For example, consider two jobs: Job A with a deadline of 3 and profit of 50, and Job B with a deadline of 1 and profit of 20. If we schedule Job A at time slot 1 (the earliest possible), we won't be able to schedule Job B at all, because its deadline is 1 and that slot is already taken. But if we schedule Job A at time slot 3 (the latest possible), we can also schedule Job B at time slot 1, thus maximizing the total profit.

The timeSlots array in the algorithm is a boolean array that keeps track of which time slots are already filled. We start from the last possible time slot (minimum of the job's deadline and total time slots) and move backwards to find a free slot. If a free slot is found, we schedule the job at that slot and mark the slot as filled in the timeSlots array.

### Does that mean that each job takes one unit of time to execute?

Yes, that's correct. In the Job Sequencing Problem as we've discussed it here, we're making the assumption that each job takes exactly one unit of time to execute. This is a simplifying assumption that allows us to represent the scheduling of jobs as filling time slots in an array.

In reality, jobs or tasks might take varying amounts of time to complete, and a more complex algorithm would be needed to schedule them optimally. However, for the purposes of this problem and the associated algorithm, we're assuming that each job takes one unit of time.

## Uses

The Job Sequencing Problem has applications in a variety of fields, particularly those involving scheduling and resource allocation. Here are a few examples:

1. **Operating Systems**: In computer operating systems, job scheduling is a key component. The OS must decide which processes to run, when to run them, and in what order, given a set of processes to execute, their CPU burst times, and their arrival times.

2. **Production Scheduling**: In manufacturing, jobs often have to be scheduled on machines or production lines. Each job might have a deadline by which it needs to be completed and a profit or cost associated with its early or late completion.

3. **Project Management**: In project management, tasks (jobs) often have deadlines and benefits associated with their completion. The job sequencing problem can help determine the order in which to undertake tasks to maximize the overall benefit.

4. **Cloud Computing**: In cloud computing, tasks need to be scheduled and executed on a set of available resources. Each task might have a deadline and a profit associated with its completion.

5. **Networking**: In computer networks, packets could be considered as jobs that need to be scheduled for transmission to ensure Quality of Service (QoS).

Remember, the Job Sequencing Problem assumes that each job takes the same amount of time. In real-world applications, this might not always be the case, and more complex algorithms might be needed.

## Time and space complexity

The time complexity of the job sequencing algorithm is mainly determined by the sorting operation and the two nested loops.

1. Sorting the jobs based on profit in decreasing order takes O(n log n) time, where n is the number of jobs.

2. The outer loop runs n times, and the inner loop can run up to n times in the worst case (when all jobs have the same deadline). Therefore, the time complexity of these nested loops is O(n^2).

So, the overall time complexity of the algorithm is O(n log n) + O(n^2). However, in Big O notation, we usually only consider the highest order term, so we can say that the time complexity of the job sequencing algorithm is O(n^2) in the worst case.

The space complexity of the job sequencing algorithm is determined by the additional space we're using apart from the input.

1. The `result` array that stores the scheduled jobs. In the worst case, this array can have the same number of elements as the input array, so its space complexity is O(n).

2. The `timeSlots` array that keeps track of the filled time slots. This array also has a length equal to the number of jobs, so its space complexity is also O(n).

Therefore, the overall space complexity of the job sequencing algorithm is O(n) + O(n) = O(2n). However, in Big O notation, we ignore constants, so we can say that the space complexity of the job sequencing algorithm is O(n).
