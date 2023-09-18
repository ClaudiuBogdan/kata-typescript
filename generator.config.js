// https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/

const katas = {
  search: [
    "search/linear_search",
    "search/binary_search",
  ],
  sort: [
    "sort/bubble_sort",
    "sort/insertion_sort",
    "sort/merge_sort",
    "sort/quick_sort",
  ],
  tree: [
    "binary_tree/traversal/binary_tree_pre_order",
    "binary_tree/traversal/binary_tree_in_order",
    "binary_tree/traversal/binary_tree_post_order",
    "binary_tree/binary_tree_compare",
    "binary_tree/binary_tree_bfs",
    "binary_tree/binary_tree_dfs",
    "binary_tree/binary_tree_lowest_common_ancestor",
    "binary_tree/binary_tree_search_operations",
  ],
  graph: [
    "graph/graph_list_bfs",
    "graph/graph_list_dfs",
    "graph/graph_matrix_bfs",
    "graph/prims_list",
    "graph/dijkstra_list",
    "graph/kruskal",
    "graph/floyd_warshall",
    "graph/bellman_ford",
  ],
  list: [
    "list/singly_linked_list",
    "list/doubly_linked_list",
    // "list/array_list", -> irrelevant
    "list/stack",
    "list/queue",
    "list/ring_buffer",
  ],
  map: [
    "map/hash_map",
  ],
  problems: [
    "problems/maze_solver",
    "problems/two_crystals_balls",
  ],
  heap: [
    "heap/min_heap",
    "heap/max_heap",
  ],
  lru: [
    "lru/lru_cache",
  ],
  trie: [
    "trie/trie",
  ],
  dynamic_programming: [
    "dynamic_programming/longest_common_subsequence",
    "dynamic_programming/coin_change",
    "dynamic_programming/fibonacci_sequence",
    "dynamic_programming/knapsack",
  ],
  strings: [
    "strings/anagram_check",
    "strings/palindrome_check",
    "strings/regular_expression_matching",
    "strings/string_matching",
  ],
};

module.exports = {
  custom: [
    ...katas.map,
    ...katas.lru,
  ], // Change the set based on you daily intended goal
  katas,
};
