const getKatasFrequency = require("./scripts/utils/frequency");
const path = require("path");
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
  ],
  graph: [
    "graph/graph_list_bfs",
    "graph/graph_list_dfs",
    "graph/graph_matrix_bfs",
    "graph/prims_list",
    "graph/dijkstra_list",
  ],
  list: [
    "list/singly_linked_list",
    "list/doubly_linked_list",
    "list/array_list",
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
};

const generateKatas = (katas, count) => {
  const katasPath = path.join(__dirname, "src", "katas");
  // Initialize frequency map with count 0 and lastDay 0
  const katasFreq = Object.values(katas).reduce((acc, kataGroup) => {
    kataGroup.forEach((kataPath) => {
      const kata = kataPath.split("/").pop();
      acc[kata] = { count: 0, lastDay: 0, path: kataPath };
    });
    return acc;
  }, {});
  // Get the frequency of each kata
  const freq = getKatasFrequency(katasPath, katasFreq);
  // Order katas by frequency and last day
  const sortedKatas = Object.keys(freq).sort((a, b) => {
    const order = freq[a].count - freq[b].count;
    return order === 0 ? freq[a].lastDay - freq[b].lastDay : order;
  }).map((kata) => {
    return freq[kata].path;
  }).filter((path) => !!path);

  // Get the first count katas
  const randomKatas = sortedKatas.slice(0, count);
  // Return the katas in the same order as the kata groups
  return randomKatas;
};

function getCount(defaultCount = 3) {
  const args = process.argv.slice(2);
  const countIndex = args.indexOf("--count");
  const count = countIndex !== -1 ? parseInt(args[countIndex + 1]) : null;

  return isNaN(count) ? defaultCount : count;
}

module.exports = {
  templates: [
    // ...katas.map,
    // ...katas.lru,
    ...generateKatas(katas, getCount()),
  ], // Change the set based on you daily intended goal
};
