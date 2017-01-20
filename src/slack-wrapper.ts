import * as slack from 'slack';

const token = process.env.BOT_TOKEN;

let botInfo: slack.SlackSelfInfo;

export function getBotInfo() {
  if (botInfo) {
    return Promise.resolve(botInfo);
  }

  return new Promise((resolve, reject) => {
    slack.auth.test({ token }, (err, data) => {
      if (err) {
        return reject(err);
      }
      botInfo = data;
      return resolve(botInfo);
    });
  });
}

export function post(message: slack.PostMessage) {
  return new Promise((resolve, reject) => {
    slack.chat.postMessage({ token, as_user: true, ...message }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

export function getUserInfo(user: string): Promise<slack.SlackUserInfo> {
  return new Promise((resolve, reject) => {
    slack.users.info({ token, user }, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

export function extractId(entityId: string) {
  return (`${entityId}`.match(/<(?:@|#)([^|]+)|/)[1]).replace(/[><]/g, '');
}
