const generateItems = require("./generate");
const { parseArgs, promptUser, promptSelect, validateCount, validateType } =
  require("./utils/input");
const config = require("../generator.config");
const getItems = require("./utils/items");

const DEFAULT_ITEMS_COUNT = 3;

// Main function
const main = async (generateCallback) => {
  // Parse command-line arguments into an object
  const args = parseArgs(process.argv.slice(2));

  let itemCount = args.count ? parseInt(args.count, 10) : null;
  let itemType = args.type || null;

  // Prompt for item type if not provided
  if (!itemType) {
    itemType = await promptSelect(
      "What type of items would you like to generate?",
      ["freq", "custom"],
      0, // Default to 'freq'
    );
  }

  // Validate item type
  if (!validateType(itemType)) {
    console.error(
      'Invalid item type. Please enter either "freq" or "custom".',
    );
    return;
  }

  const { items, defaultCount, maxCount } = getItems(
    itemType,
    config,
    DEFAULT_ITEMS_COUNT,
  );

  // Prompt for item count if not provided and type is 'freq'
  if (!itemCount) {
    const answer = await promptUser(
      `How many items would you like to generate? (Max: ${maxCount})`,
      defaultCount,
    );
    itemCount = parseInt(answer, 10);
  }

  // Validate item count
  if (!validateCount(itemCount, maxCount)) {
    console.error(
      `Invalid item count. Please enter a number between 1 and ${maxCount}.`,
    );
    return;
  }

  // Generate items using the callback
  generateCallback(items, itemCount);
};

// Run the main function
main(generateItems, DEFAULT_ITEMS_COUNT);
