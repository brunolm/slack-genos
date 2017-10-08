import * as file from './file';
import * as path from 'path';

export async function getMemoryFile() {
  const memFile = path.join(__dirname, '../../memory.json');
  const exists = await file.exists(memFile);

  if (!exists) {
    file.writeFile(memFile, '{}');
  }

  return memFile;
}

export async function load() {
  const mem = await file.readFile(await getMemoryFile());
  return JSON.parse(mem);
}

export async function set(value: Object) {
  const mem = await load();

  const newMem = { ...mem, ...value };
  await file.writeFile(await getMemoryFile(), JSON.stringify(newMem));
}
