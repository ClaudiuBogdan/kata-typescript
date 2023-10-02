type FreqConfig = {
    category?: string;
    difficulty?: TemplatesDifficulty;
    ids?: string[];
    count?: number;
};

export const freqConfig: FreqConfig[] = [
    {
        difficulty: "easy",
        count: 5,
    },
    // {
    //     difficulty: "medium",
    //     count: 2,
    // },
    // {
    //     difficulty: "hard",
    //     count: 1,
    // },
    // {
    //     ids: ["search/linear_search", "search/binary_search"],
    // },
];
