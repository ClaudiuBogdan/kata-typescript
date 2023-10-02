import fs from "fs";
import path from "path";
import { getKatasFrequency } from "./utils";

export function package_json(dayPath: string) {
    const package_json = require("../../package.json");
    package_json.scripts["test:day"] = `jest ${dayPath}`;
    package_json.scripts.day = `echo ${dayPath}`;

    fs.writeFileSync(
        path.join(__dirname, "..", "package.json"),
        JSON.stringify(package_json, null, 4),
    );
}

export function stats(katasPath: string) {
    const freq = getKatasFrequency(katasPath);

    fs.writeFileSync(
        path.join(__dirname, "..", "stats.json"),
        JSON.stringify(freq, null, 4),
    );
}
