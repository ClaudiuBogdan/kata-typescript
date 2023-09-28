// Deep merge function

function deepMerge(...sources) {
  const target = {};

  sources.forEach((source) => {
    for (const key in source) {
      if (source[key] instanceof Object && !(source[key] instanceof Array)) {
        if (target[key] instanceof Object && !(target[key] instanceof Array)) {
          target[key] = deepMerge(target[key], source[key]);
        } else {
          target[key] = deepMerge({}, source[key]);
        }
      } else if (source[key] instanceof Array) {
        if (target[key] instanceof Array) {
          target[key] = [...target[key], ...source[key]];
        } else {
          target[key] = [...source[key]];
        }
      } else {
        target[key] = source[key];
      }
    }
  });

  return target;
}

module.exports = deepMerge;
