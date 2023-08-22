const fs = require("fs");
const path = require("path");

function isDayFolder(folderName) {
  return folderName.startsWith("day");
}

function getDayNumber(folderName) {
  return parseInt(folderName.replace("day", ""), 10);
}

function updateFrequencyMap(freqMap, leafFolder, day) {
  if (!freqMap[leafFolder]) {
    freqMap[leafFolder] = { count: 0, lastDay: 0 };
  }
  freqMap[leafFolder].count += 1;
  freqMap[leafFolder].lastDay = Math.max(freqMap[leafFolder].lastDay, day);
}

function traverseDirectory(directory, day, freqMap) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (isDayFolder(file)) {
        traverseDirectory(filePath, getDayNumber(file), freqMap);
      } else {
        updateFrequencyMap(freqMap, file, day);
        traverseDirectory(filePath, day, freqMap);
      }
    }
  }
}

function readFolderStructure(folderPath, freqMap = {}) {
  traverseDirectory(folderPath, 0, freqMap);
  return freqMap;
}

function getKatasFrequency(folderPath, freqMap) {
  return readFolderStructure(folderPath, freqMap);
}

module.exports = getKatasFrequency;
