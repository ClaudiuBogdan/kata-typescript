const path = require("path");
const utils = require("./utils");
const align = require("./align-configs");
const getKatasFrequency = require("./utils/frequency");

const getKatas = (katas, count) => {
  // If count is greater than the number of katas, return all katas
  if (count >= katas.length) {
    return katas;
  }

  const katasPath = path.join(__dirname, "..", "src", "katas");
  // Initialize frequency map with count 0 and lastDay 0
  const katasFreq = katas.reduce((acc, kataPath) => {
    const kata = kataPath.split("/").pop();
    acc[kata] = { count: 0, lastDay: 0, path: kataPath };
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

const generate = (katas, count) => {
  const dayPath = utils.createDayDirectory();
  const baseKataPath = path.join(__dirname, "..", "src", "templates");

  const selectedKatas = getKatas(katas, count);

  selectedKatas.forEach((kata) => {
    const kataPath = path.join(baseKataPath, ...kata.split("/"));
    const kataName = kata.split("/").pop();
    const targetPath = path.join(dayPath, kataName);
    utils.copyTemplate(targetPath, kataPath);
  });

  align.package_json(dayPath);
  align.stats(utils.katasPath);
};

//export default generate;
module.exports = generate;
