import * as fs from 'fs';

export function readdir(dirPath) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      return resolve(files);
    });
  });
}

export function stat(entityPath: string | Buffer) {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(entityPath, (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}

export function exists(dirPath: string) {
  return new Promise<boolean>((resolve) => fs.exists(dirPath, resolve));
}

export function mkdir(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => err ? reject(err) : resolve());
  });
}

export async function readFile(filename: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export async function writeFile(filename: string, data: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, {
      encoding: 'utf-8'
    }, err => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve();
    });
  });
}
