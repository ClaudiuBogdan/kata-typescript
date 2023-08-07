const path = require("path");
const utils = require("../utils");
const config = require("../../generator.config");
const align = require("./align-configs");

const dayName = utils.getDayName();
const dayPath = utils.createDayDirectory();
const templatesPath = path.join(__dirname, "..", "..", "src", "templates");

config.templates.forEach((template) => {
  const templatePath = path.join(templatesPath, template);
  const targetPath = path.join(dayPath, template);
  utils.copyTemplate(targetPath, templatePath);
});

align.jest(dayName);
align.ts_config(dayName);
align.package_json(config, dayPath);
