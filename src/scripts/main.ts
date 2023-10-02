import path from "path";
import { findMetaFiles, getKatasFrequency, input } from "./utils";
import { freqConfig } from "./generator.config";
import { generate } from "./generate";

function getKatasFreq(): FrequencyMap {
    const katasPath = path.join(__dirname, "..", "katas");
    const freq = getKatasFrequency(katasPath);
    return freq;
}

function getTemplates(): MetaData[] {
    const templatesPath = path.join(__dirname, "..", "templates");
    const metaFilesPaths = findMetaFiles(templatesPath);
    const metaFileName = "/meta.ts";
    const freq = getKatasFreq();
    const metaDataItems = metaFilesPaths
        .map((filePath) => {
            const meta = require(filePath).meta as TemplateMetaData;
            return {
                ...meta,
                templatePath: filePath.slice(0, -1 * metaFileName.length),
                freq: freq[meta.id] ? freq[meta.id] : { count: 0, lastDay: 0 },
            } as MetaData;
        })
        .filter((meta) => !meta.disabled);

    return metaDataItems.sort((a, b) => a.freq.count - b.freq.count);
}

function getItemsByFrequency(): MetaData[] {
    const items: MetaData[] = [];
    const templates = getTemplates();
    freqConfig.forEach((config) => {
        const { category, difficulty, ids, count } = config;
        let filteredTemplates = templates.filter(
            (template) =>
                (!category || template.category === category) &&
                (!difficulty || template.difficulty === difficulty) &&
                (!ids || ids.includes(template.id)),
        );
        if (count !== undefined) {
            filteredTemplates = filteredTemplates.slice(0, count);
        }
        items.push(...filteredTemplates);
    });
    return items;
}

// Main function
const main = async (generateCallback: GenerateCallback) => {
    const items = getItemsByFrequency();

    // Generate items using the callback
    generateCallback(items);
};

// Run the main function
main(generate);
