import fs from "fs";
import path from "path";

function isDayFolder(folderName: string) {
    return folderName.startsWith("day");
}

function isMetaFile(fileName: string) {
    const metaName = "meta.ts";
    return fileName.slice(-1 * metaName.length) === metaName;
}

function getDayNumber(folderName: string) {
    return parseInt(folderName.replace("day", ""), 10);
}

function updateFrequencyMap(
    freqMap: FrequencyMap,
    day: number,
    meta: TemplateMetaData,
) {
    if (!freqMap[meta.id]) {
        freqMap[meta.id] = { count: 0, lastDay: 0 };
    }
    freqMap[meta.id].count += 1;
    freqMap[meta.id].lastDay = Math.max(freqMap[meta.id].lastDay, day);
}

function traverseDirectory(
    directory: string,
    day: number,
    freqMap: FrequencyMap,
) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            traverseDirectory(filePath, day || getDayNumber(file), freqMap);
        } else if (stat.isFile() && isMetaFile(file)) {
            const meta = require(filePath).meta as TemplateMetaData;
            updateFrequencyMap(freqMap, day, meta);
        }
    }
}

function readFolderStructure(folderPath: string, freqMap = {}) {
    traverseDirectory(folderPath, 0, freqMap);
    return freqMap;
}

function getKatasFrequency(folderPath: string, freqMap: FrequencyMap = {}) {
    return readFolderStructure(folderPath, freqMap);
}

export { getKatasFrequency };