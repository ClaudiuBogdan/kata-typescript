const path = require("path");
const utils = require("./utils");
const config = require("../generator.config");
const align = require("./align-configs");

const dayName = utils.getDayName();
const dayPath = utils.createDayDirectory();
const baseTemplatePath = path.join(__dirname, "..", "src", "templates");

config.templates.forEach((template) => {
  const templatePath = path.join(baseTemplatePath, ...template.split("/"));
  const templateName = template.split("/").pop();
  const targetPath = path.join(dayPath, templateName);
  utils.copyTemplate(targetPath, templatePath);
});

align.jest(dayName);
align.ts_config(dayName);
align.package_json(config, dayPath);
