import * as slack from 'slack';
import * as slackw from '../slack-wrapper';

import { Command } from '../base-command';

const cmd: Command = async ({ message, args, text }) => {
  const { channel } = await slackw.getChannelInfo(message.channel);

  const memberId = channel.members[(Math.random() * channel.members.length) | 0];

  const { user } = await slackw.getUserInfo(memberId);


  await slackw.post({
    channel: message.channel,
    text: `@${user.name} you have been choosen!`,
  });
};

export default cmd;
