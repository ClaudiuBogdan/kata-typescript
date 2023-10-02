import fs from "fs";
import path from "path";
import { findMetaFiles } from "./findMetaFiles";
import { getKatasFrequency } from "./frequency";
import * as input from "./input";

const katasPath = path.join(__dirname, "..", "..", "katas");

function getDayNumber() {
    let day = 1;

    try {
        day =
            +fs
                .readdirSync(katasPath)
                .filter((i) => i.includes("day"))
                .sort((a: string, b: string) => {
                    return Number(b.substring(3)) - Number(a.substring(3));
                })[0]
                .substring(3) + 1;

        if (isNaN(day)) {
            console.log("day is nan");
            day = 1;
        }
    } catch (e) {
        day = 1;
    }
    return day;
}

function getDayName() {
    const isPreviousDayEmpty = isPreviousDayFolderEmpty();
    const dayNumber = getDayNumber();
    const day = isPreviousDayEmpty ? dayNumber - 1 : dayNumber;

    return `day${day}`;
}

function isPreviousDayFolderEmpty() {
    const previousDayNumber = getDayNumber() - 1;
    const previousDayName = `day${previousDayNumber}`;
    const previousDayPath = path.join(katasPath, previousDayName);
    const files = fs.readdirSync(previousDayPath);
    return files.length === 0;
}

function createDayDirectory() {
    const dayName = getDayName();
    const dayPath = path.join(katasPath, dayName);
    const relativeDayPath = path.relative(process.cwd(), dayPath);
    try {
        fs.unlinkSync(dayPath);
    } catch (e) {}
    try {
        fs.mkdirSync(dayPath);
    } catch (e) {}
    return relativeDayPath;
}

function copyTemplate(dayPath: string, templatePath: string) {
    // Create target folder if it doesn't exist
    if (!fs.existsSync(dayPath)) {
        fs.mkdirSync(dayPath);
    }

    // Get all files in source directory
    const files = fs.readdirSync(templatePath);

    // Copy each file to the target directory
    files.forEach((file: string) => {
        const filePath = path.join(templatePath, file);
        const targetPath = path.join(dayPath, file);

        // Copy file to target directory
        if (fs.lstatSync(filePath).isFile()) {
            fs.copyFileSync(filePath, targetPath);
        } // Recursively copy subdirectories
        else if (fs.lstatSync(filePath).isDirectory()) {
            copyTemplate(targetPath, filePath);
        }
    });
}

export {
    getDayNumber,
    getDayName,
    createDayDirectory,
    copyTemplate,
    katasPath,
    findMetaFiles,
    getKatasFrequency,
    input,
};
