const getItems = (type, config, defaultCount) => {
  if (type === "freq") {
    const items = Object.values(config.katas).flat();
    return {
      items,
      defaultCount,
      maxCount: items.length,
    };
  }
  if (type === "custom") {
    return {
      items: config.custom,
      defaultCount: config.custom.length,
      maxCount: config.custom.length,
    };
  }
  return [];
};

module.exports = getItems;
