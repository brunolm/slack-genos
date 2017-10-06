import * as file from './file';
import * as path from 'path';

export async function save(user, settings) {
  const userSettings = await load(user);

  Object.assign(userSettings, settings);
  await saveFile(user, JSON.stringify(userSettings));

  return userSettings;
}

export async function load(user) {
  try {
    const settings = await loadFile(user);
    return JSON.parse(settings || '{}');
  }
  catch (err) {
    return {};
  }
}

async function getSettingsDir() {
  const dir = path.join(__dirname, '../../usersettings');
  const exists = await file.exists(dir);
  if (!exists) {
    await file.mkdir(dir);
  }
  return dir;
}

async function getSettingsFile(filename: string) {
  const settingsDir = await getSettingsDir();
  const seetingsFile = path.join(settingsDir, `${filename}.json`);
  return seetingsFile;
}

async function saveFile(userId: string, content: string) {
  const settingsFile = await getSettingsFile(userId);
  await file.writeFile(settingsFile, content);
}

async function loadFile(userId: string) {
  const content = await file.readFile(await getSettingsFile(userId));
  return content;
}
