import * as cluster from 'cluster';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as slack from 'slack';
import * as slackw from './slack-wrapper';

import logger from './logger';

const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  cluster.fork({ ...process.env, CLUSTER_BOT: true });
  cluster.fork({ ...process.env, CLUSTER_TASK: true });

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', ({ channel, text }: slack.PostMessage) => {
      slackw.post({
        channel,
        text,
      });
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
else {
  function loadCommands(dirPath: string, result: string[] = []) {
    const commandFiles = fs.readdirSync(dirPath);

    for (let commandFile of commandFiles) {
      if (/^_/.test(commandFile)) {
        continue;
      }

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

  function findHelpFile(filename: string) {
    return new Promise<string>((resolve, reject) => {
      glob('src/**/*.md', (err, files) => {
        if (err) {
          return reject(err);
        }

        const file = files.find((name) => name.indexOf(`/${filename}`) !== -1);
        return resolve(file);
      });
    });
  }

  if (process.env.CLUSTER_BOT) {
    const log = logger('index');

    const token = process.env.BOT_TOKEN;
    const bot = slack.rtm.client();

    const commands = {};

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
                const helpFile = await findHelpFile(commandName);

                await slackw.post({
                  channel: message.channel,
                  text: helpFile ? fs.readFileSync(helpFile).toString() : 'No help available',
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

    process.on('message', (msg) => {
      console.log('process on message listener>>', msg);
    });
  }

  if (process.env.CLUSTER_TASK) {
    const commandFiles = loadCommands(path.join(__dirname, './schedule'));

    commandFiles.forEach((commandFile) => require(commandFile).default());
  }

  console.log(`Worker ${process.pid} started`);
}
