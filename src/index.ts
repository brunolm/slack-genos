import * as fs from 'fs';
import * as path from 'path';
import * as slack from 'slack';
import * as slackw from './slack-wrapper';

import logger from './logger';

const log = logger('index');

const token = process.env.BOT_TOKEN;
const bot = slack.rtm.client();

const commands = {};

function loadCommands(dirPath: string, result: string[] = []) {
  const commandFiles = fs.readdirSync(dirPath);

  for (let commandFile of commandFiles) {
    let dir = path.join(dirPath, commandFile);
    if (fs.statSync(dir).isDirectory()) {
      loadCommands(path.join(dirPath, commandFile), result);
    }
    else if (/[.]ts$/.test(commandFile)) {
      result.push(dir);
    }
  }

  return result;
}

bot.hello(async () => {
  try {
    const info = await slackw.getBotInfo();
    log.info('Bot info', info);

    const commandFiles = loadCommands(path.join(__dirname, './commands'));

    for (let commandFile of commandFiles) {
      let commandPackage = require(commandFile);
      commands[path.basename(commandFile, '.ts')] = {
        command: commandPackage.default,
      };
    }

    log.info(`Loaded ${commandFiles.length} commands. ${Object.keys(commands).join(', ')}`);
  }
  catch (err) {
    log.error(err);
  }
});

bot.message(async (message) => {
  try {
    const info = await slackw.getBotInfo();

    if (info.user_id !== message.user) {
      if (message.type === 'message' && !message.subtype && /^[.]/.test(message.text)) {
        const { user } = await slackw.getUserInfo(message.user);
        log.info(`${user.name} (${user.id}) requested the command ${message.text}`);

        try {
          const [, commandName] = message.text.match(/^[.]([\S]*)/);
          const text = message.text.slice(message.text.split(/\s/, 1)[0].length + 1);
          const args = message.text.split(/\s/g);

          const params = { message, user, commandName, text, args };

          if (args.length >= 2 && /-h|--help/i.test(args[1])) {
            await slackw.post({
              channel: message.channel,
              text: fs.readFileSync(path.join(__dirname, `./commands/${commandName}.md`)).toString(),
            });
          }
          else {
            await commands[commandName].command(params);
          }
        }
        catch (err) {
          log.error('Command error', err);
        }
      }
    }
  }
  catch (err) {
    log.error(err);
  }
});

bot.listen({ token }, () => {
  log.debug('Started!');
});
