const fs = require("fs");
const path = require("path");

const katasPath = path.join(__dirname, "..", "..", "src", "katas");

function getDayNumber() {
  let day = 1;

  try {
    day = +fs.readdirSync(katasPath)
      .filter((i) => i.includes("day"))
      .sort((a, b) => {
        return +b.substring(3) - a.substring(3);
      })[0].substring(3) + 1;

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
  const day = getDayNumber();
  return `day${day}`;
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

function copyTemplate(dayPath, templatePath) {
  // Create target folder if it doesn't exist
  if (!fs.existsSync(dayPath)) {
    fs.mkdirSync(dayPath);
  }

  // Get all files in source directory
  const files = fs.readdirSync(templatePath);

  // Copy each file to the target directory
  files.forEach((file) => {
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

module.exports = {
  getDayNumber,
  getDayName,
  createDayDirectory,
  copyTemplate,
  katasPath,
};
