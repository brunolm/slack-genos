import * as slack from 'slack';
import * as slackw from '../slack-wrapper';

import { Command } from '../base-command';

const msg: Command = async ({ args, text }) => {
  await slackw.post({
    channel: slackw.extractId(args[1]),
    text: text.slice(text.indexOf(' ') + 1),
  });
};

const helpCmd: Command = async ({ message }) => {
  await slackw.post({
    channel: message.channel,
    text: `Usage: \`.msg <#channel|@user> text\`

Example:

\`\`\`
.msg #random Incinerate!
\`\`\`
`,
  });
};

export default msg;
export const help = helpCmd;
