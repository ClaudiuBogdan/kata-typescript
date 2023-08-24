const fs = require("fs");
const path = require("path");
const generateKatasFrequency = require("./utils/frequency");

module.exports.package_json = function (dayPath) {
  const package_json = require("../package.json");
  package_json.scripts["test:day"] = `jest ${dayPath}`;
  package_json.scripts.day = `echo ${dayPath}`;

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
