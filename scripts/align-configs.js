const fs = require("fs");
const path = require("path");
const generateKatasFrequency = require("./utils/frequency");

module.exports.package_json = function (config, day_path) {
  const package_json = require("../package.json");
  const katas = config.templates.map((templatePath) =>
    String(templatePath).split("/").pop()
  ).join(" ");
  package_json.scripts["test:day"] = `jest ${katas}`;
  package_json.scripts.day = `echo ${day_path}`;

  fs.writeFileSync(
    path.join(__dirname, "..", "package.json"),
    JSON.stringify(package_json, null, 4),
  );
};

module.exports.stats = function (katasPath) {
  const freq = generateKatasFrequency(katasPath);

  fs.writeFileSync(
    path.join(__dirname, "..", "stats.json"),
    JSON.stringify(freq, null, 4),
  );
};
