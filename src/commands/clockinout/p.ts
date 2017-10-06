import * as settings from '../../services/settings';
import * as slack from 'slack';
import * as slackw from '../../slack-wrapper';

import { getSettings, parseArgs, validateOptions } from './_btd-settings';

import AhgoraService from 'btd-ahgora/built/ahgora-service';
import { Command } from '../../base-command';

const cmd: Command = async ({ args, message, text, user }) => {
  const argsOptions = parseArgs(args) as any;

  const userSettings = await settings.load(user.name);
  const options = { ...getSettings(userSettings.btd), ...argsOptions };

  await slackw.post({
    channel: message.channel,
    text: 'Checking...',
  });

  try {
    validateOptions(options);
  }
  catch (err) {
    await slackw.post({
      channel: message.channel,
      text: err.message,
    });
    return;
  }

  const service = new AhgoraService(options);
  await service.login();

  const timeData = await service.getTimes();
  let msg = '';

  if (options.showGrid) {
    const gridMsg = service.parseGrid(timeData.times);
    msg += `\`\`\`\n${gridMsg}\n\`\`\`\n`;
  }

  const today = service.getToday(timeData.times);
  if (today && today.beats && today.beats.length) {
    msg += `\`\`\`${today.beatsRaw} (${today.total.match(/\d{2}:\d{2}/)})\`\`\`\n`;
  }
  msg += `${service.parseResult(timeData.times)}`;

  await slackw.post({
    channel: message.channel,
    text: msg,
  });
};

export default cmd;
