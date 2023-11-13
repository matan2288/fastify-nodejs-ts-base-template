import * as fs from 'fs';
import * as path from 'path';

export const deleteFsFile = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File doesn't exist at ${filePath}`);
  }

  try {
    fs.unlinkSync(filePath);
    console.log(`[INFO] File: ${filePath} deleted`);
  } catch (err) {
    console.error(`[ERROR] Failed to delete ${filePath}`, err);
  }
};

export const createFsFile = (filePath: string, content: string, callback: () => void = () => {}): void => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`[ERROR] Failed to create ${filePath}`, err);
      return;
    }
    console.log(`[INFO] File ${filePath} created.`);
    callback();
  });
};

export const createFsDirectory = async (directoryPath: string): Promise<void> => {
  try {
    await fsPromises.mkdir(directoryPath, { recursive: true });
    console.log(`[INFO] Directory ${directoryPath} created.`);
  } catch (err) {
    console.error(`[ERROR] Failed to create directory ${directoryPath}`, err);
  }
};

export const readFsFile = (filePath: string): Record<string, any> => {
    try {
      const data: string = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error(`[ERROR] Failed to read ${filePath}`, e);
      return {};
    }
  };

export const readFsDir = (dirPath: string, callback: (files: string[]) => void): void => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`[ERROR] Failed to read dir: ${dirPath}`, err);
      return;
    }
    callback(files);
  });
};

export const isFileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

export const readFsFileSync = (filePath: string): Record<string, any> => {
  return JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(filePath, 'utf8')), null, "\t"));
};

export const createFsFileSync = (filePath: string, content: string): void => {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`[INFO] File ${filePath} created.`);
  } catch (err) {
    console.error(`[ERROR] Failed to create ${filePath}`, err);
  }
};

export const writeFsFileSync = (filePath: string, content: string): void => {
  try {
    if (isFileExists(filePath)) {
      fs.appendFileSync(filePath, content);
    } else {
      createFsFileSync(filePath, content);
    }
  } catch (err) {
    console.error(`[ERROR] Failed to write ${filePath}`, err);
  }
};
