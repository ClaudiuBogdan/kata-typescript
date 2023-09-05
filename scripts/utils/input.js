const readline = require("readline");

// Function to prompt the user for input
const promptUser = (question, defaultValue) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (Default: ${defaultValue}): `, (answer) => {
      rl.close();
      resolve(answer || defaultValue);
    });
  });
};

// Function to prompt the user for a selection from a list
const promptSelect = (question, options, defaultIndex = 0) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log(question);
    options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    rl.question(
      `Select an option (Default: ${options[defaultIndex]}): `,
      (answer) => {
        rl.close();
        if (!answer) {
          console.log(
            `No selection made. Using default option: ${
              options[defaultIndex]
            }.`,
          );
          resolve(options[defaultIndex]);
          return;
        }

        const selectedIndex = parseInt(answer, 10) - 1;
        if (selectedIndex >= 0 && selectedIndex < options.length) {
          resolve(options[selectedIndex]);
        } else {
          console.log(
            `Invalid selection. Using default option: ${
              options[defaultIndex]
            }.`,
          );
          resolve(options[defaultIndex]);
        }
      },
    );
  });
};

// Function to parse CLI arguments into an object
const parseArgs = (args) => {
  const argObj = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("--", "");
    const value = args[i + 1];
    argObj[key] = value;
  }
  return argObj;
};

const validateCount = (count, maxCount) => {
  if (isNaN(count) || count > maxCount || count < 1) {
    return false;
  }
  return true;
};

const validateType = (type) => {
  if (!["freq", "custom"].includes(type)) {
    return false;
  }
  return true;
};

module.exports = {
  promptUser,
  promptSelect,
  parseArgs,
  validateCount,
  validateType,
};
