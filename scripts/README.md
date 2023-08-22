# Generate katas using file templates

## Objective

Use files that contain the base functions or data structure with defined interfaces to generate the daily katas. This way it will be easier to copy and paste algorithms, data structures or any other code that you want to practice, remove the solution from the code and leave only the interface and/or function definition. The file should also include a test suite.

## How it works

The v2/generate.js script will copy the files (template and tests) from the templates folder into the corresponding day folder. Then, the test config will point to the newly created day that include the tests.

```text
.
├── templates
│   ├── algorithm_1
│   │   ├── template1.ts
│   │   ├── test1.test.ts
│   ├── algorithm_2
│   │   ├── template2.ts
│   │   ├── test2.test.ts
├── src
│   ├── day1
│   │   ├── algorithm_1
│   │   │   ├── solution1.ts
│   │   │   ├── test1.test.ts
│   │   ├── algorithm_2
│   │   │   ├── solution2.ts
│   │   │   ├── test2.test.ts
│   ├── day2
│   │   ├── algorithm_1
│   │   │   ├── solution1.ts
│   │   │   ├── test1.test.ts
│   │   ├── algorithm_2
│   │   │   ├── solution2.ts
│   │   │   ├── test2.test.ts
```

## Katas folder structure

```text
.
├── src
│   ├── katas
│   │   ├── day1
│   │   │   ├── binary_search
│   │   │   │   ├── index.ts
│   │   │   │   ├── test.ts
│   │   │   ├── linear_search
│   │   │   │   ├── index.ts
│   │   │   │   ├── test.ts
│   │   ├── day2
│   │   │   ├── bubble_sort
│   │   │   │   ├── index.ts
│   │   │   │   ├── test.ts
│   │   │   ├── insertion_sort
│   │   │   │   ├── index.ts
│   │   │   │   ├── test.ts
│   │   │   ├── ...
```
