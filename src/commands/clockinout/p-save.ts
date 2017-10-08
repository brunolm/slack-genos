import * as settings from '../../services/settings';
import * as slack from 'slack';
import * as slackw from '../../slack-wrapper';

import { getSettings, parseArgs } from './_btd-settings';

import AhgoraService from 'btd-ahgora/built/ahgora-service';
import { Command } from '../../base-command';

const cmd: Command = async ({ args, message, text, user }) => {
  const argsOptions = parseArgs(args) as any;

  const userSettings = await settings.load(user.name);
  const options = { ...getSettings(userSettings.btd), ...argsOptions };

  await settings.save(user.name, { ...user, btd: options });

  await slackw.post({
    channel: message.channel,
    text: `Config saved!\n\`\`\`\n${JSON.stringify(options, undefined, 2)}\n\`\`\``,
  });
};

export default cmd;
