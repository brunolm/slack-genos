import * as slack from 'slack';
import logger from './logger';

const log = logger('index');

const bot = slack.rtm.client();
const token = process.env.BOT_TOKEN;

bot.message(message => {
  log.debug('Got a message:', message);
  // slack.chat.postMessage({
  //   token,
  //   channel: '@bruno.michels',
  //   text: 'hello',
  //   as_user: true,
  // }, (err, data) => {
  //   console.log('data', data);
  // });
});

bot.listen({ token }, () => {
  log.debug('Started!');
});
