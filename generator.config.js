// https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/
const { deepMerge } = require("./scripts/utils");

const basicKatas = {
  search: [
    "search/linear_search",
    "search/binary_search",
  ],
  sort: [
    "sort/bubble_sort",
    "sort/insertion_sort",
  ],
  list: [
    "list/singly_linked_list",
    "list/doubly_linked_list",
  ],
  map: [
    "map/hash_map",
  ],
  heap: [
    "heap/min_heap",
    "heap/max_heap",
  ],
  problems: [
    "problems/maze_solver",
    "problems/two_crystals_balls",
    "problems/two_sum",
  ],
};

const mediumKatas = {
  sort: [
    "sort/merge_sort",
    "sort/quick_sort",
  ],
  tree: [
    "binary_tree/traversal/binary_tree_pre_order",
    "binary_tree/traversal/binary_tree_in_order",
    "binary_tree/traversal/binary_tree_post_order",
    "binary_tree/binary_tree_compare",
  ],
  graph: [
    "graph/graph_list_bfs",
    "graph/graph_list_dfs",
    "graph/graph_matrix_bfs",
    "graph/prims_list",
    "graph/dijkstra_list",
  ],
  list: [
    "list/stack",
    "list/queue",
    "list/ring_buffer",
  ],
  problems: [
    "problems/max_subarray_sum_kadane",
    "problems/max_subarray_sum_sliding_window",
  ],
  dynamic_programming: [
    "dynamic_programming/longest_common_subsequence",
    "dynamic_programming/coin_change",
  ],
  strings: ["strings/anagram_check", "strings/palindrome_check"],
  lru: ["lru/lru_cache"],
};

const advancedKatas = {
  tree: [
    "binary_tree/binary_tree_bfs",
    "binary_tree/binary_tree_dfs",
    "binary_tree/binary_tree_lowest_common_ancestor",
    "binary_tree/binary_tree_search_operations",
    "binary_tree/red_black_tree",
    "binary_tree/avl_tree",
  ],
  graph: [
    "graph/kruskal",
    "graph/floyd_warshall",
    "graph/bellman_ford",
    "graph/topological_sort",
    "graph/hamiltonian_cycle",
    "graph/hamiltonian_path",
    "graph/articulation_points",
    "graph/graph_bridges",
    "graph/strongly_connected_components",
    "graph/eulerian_path",
    "graph/eulerian_circuit",
    "graph/minimum_cut",
    "graph/maximum_flow",
    "graph/maximum_bipartite_matching",
    "graph/a_star",
    "graph/cycle_detection",
  ],
  dynamic_programming: [
    "dynamic_programming/fibonacci_sequence",
    "dynamic_programming/knapsack",
  ],
  strings: [
    "strings/regular_expression_matching",
    "strings/string_matching",
  ],
  trie: [
    "trie/trie",
  ],
  greedy: [
    "greedy/activity_selection",
    "greedy/knapsack_fractional",
    "greedy/huffman_encoding",
    "greedy/job_sequencing",
  ],
};

const katas = deepMerge(basicKatas, mediumKatas, advancedKatas);

// Change the set based on you daily intended goal
const customKatas = [
  "heap/max_heap",
  "sort/merge_sort",
  "binary_tree/binary_tree_bfs",
  "binary_tree/binary_tree_search_operations",
  "binary_tree/red_black_tree",
];

module.exports = {
  custom: customKatas,
  katas: basicKatas,
};
