import * as fileService from '../services/file';
import * as path from 'path';
import * as slack from 'slack';
import * as slackw from '../slack-wrapper';

import { Command } from '../base-command';

const cmd: Command = async ({ message, text }) => {
  const files = (await fileService.readdir(__dirname))
    .filter(file => /[.]ts/i.test(path.extname(file)))
    .map(file => `\`${path.basename(file, '.ts')}\``)
    .sort()
    .join(', ');

  await slackw.post({
    channel: message.channel,
    text: `Available commands are: ${files}`,
  });
};

export default cmd;
