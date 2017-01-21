import * as fileService from '../services/file';
import * as path from 'path';
import * as slack from 'slack';
import * as slackw from '../slack-wrapper';

import { Command } from '../base-command';

const cmd: Command = async ({ message, args }) => {
  let dir = __dirname;

  if (args.length >= 2) {
    dir = path.join(dir, args[1]);
  }

  const entries = await fileService.readdir(dir);

  const folders = [];

  for (let entry of entries) {
    if ((await fileService.stat(path.join(dir, entry))).isDirectory()) {
      folders.push(entry);
    }
  }

  const categories = folders
    .map(folder => `\`${folder}\``)
    .sort()
    .join(', ');

  const files = entries
    .filter(file => /[.]ts/i.test(path.extname(file)))
    .map(file => `\`${path.basename(file, '.ts')}\``)
    .sort()
    .join(', ');

  const availableCommands = `Available commands are: ${files}`;
  const availableGroups = folders.length ? `\n\nOther command groups (ex: \`.help ${folders[0]}\`): ${categories}` : '';

  await slackw.post({
    channel: message.channel,
    text: `${availableCommands}${availableGroups}`,
  });
};

export default cmd;
