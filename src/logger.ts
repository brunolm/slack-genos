import * as log4js from 'log4js';

export default (namespace, level = log4js.levels.DEBUG) => {
  const log = log4js.getLogger(`slack-genos:${namespace}`);
  log.setLevel(process.env.LOG_LEVEL || level);
  return log;
};
