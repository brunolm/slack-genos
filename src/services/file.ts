import * as fs from 'fs';

export function readdir(dirPath): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    });
  });
}

export function stat(entityPath: string | Buffer): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(entityPath, (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}
