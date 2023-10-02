import fs from 'fs';
import path from 'path';

// Synchronous function to locate all "meta.ts" files
export const findMetaFiles = (basePath: string): string[] => {
  let metaFiles: string[] = [];

  try {
    // Read the contents of the base directory
    const entries = fs.readdirSync(basePath, { withFileTypes: true });
  
    // Loop through each entry in the directory
    for (const entry of entries) {
      const fullPath = path.join(basePath, entry.name);
  
      if (entry.isDirectory()) {
        // If the entry is a directory, run the function recursively
        const nestedMetaFiles = findMetaFiles(fullPath);
        metaFiles = metaFiles.concat(nestedMetaFiles);
      } else if (entry.isFile() && entry.name === 'meta.ts') {
        // If the entry is a file named "meta.ts", add it to the list
        metaFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${basePath}: ${error.message}`);
  }

  return metaFiles;
};
