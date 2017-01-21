import * as slack from 'slack';
import * as slackw from '../slack-wrapper';

import { Command } from '../base-command';

const cmd: Command = async ({ args, text }) => {
  await slackw.post({
    channel: slackw.extractId(args[1]),
    text: text.slice(text.indexOf(' ') + 1),
  });
};

export default cmd;
