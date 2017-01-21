import * as slack from 'slack';
import * as slackw from '../../slack-wrapper';

import { Command } from '../../base-command';

const cmd: Command = async ({ message }) => {
  await slackw.post({
    channel: message.channel,
    text: `http://thecatapi.com/api/images/get?format=src&type=gif&c=${Math.random()}`,
  });
};

export default cmd;
