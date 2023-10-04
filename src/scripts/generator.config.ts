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
    {
        ids: [
            "binary_tree/avl_tree",
            "binary_tree/red_black_tree"
        ],
    },
];
