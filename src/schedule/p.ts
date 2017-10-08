import * as memory from '../services/memory';
import * as moment from 'moment';
import * as path from 'path';

import AhgoraService from 'btd-ahgora/built/ahgora-service';
import { findFiles } from '../services/file';
import logger from '../logger';

const log = logger('btd:notifications');

async function runTasks() {
  const mem = await memory.load();
  const files = await findFiles('usersettings/*.json');

  for (const file of files) {
    try {
      const settings = require(path.join(__dirname, '../../', file));

      const service = new AhgoraService(settings.btd);

      if (!settings.btd.user && !settings.btd.pass) {
        continue;
      }

      await service.login();

      const dataTime = await service.getTimes();
      const today = service.getToday(dataTime.times);
      const result = service.parseResult(dataTime.times);

      if (today.beats.length <= 1) {
        continue;
      }

      const notificationFromMem = deepRead(mem, ['btd', 'notifications', settings.id, today.beats.length]);

      if (notificationFromMem) {
        const isFromToday = moment(notificationFromMem.date) >= moment().startOf('day')
          && moment(notificationFromMem.date) <= moment().endOf('day');

        if (isFromToday) {
          continue;
        }
      }

      deepAssign(mem, ['btd', 'notifications', settings.id, today.beats.length], {
        date: moment(),
      });

      memory.set({ ...mem });

      process.send({
        channel: settings.id,
        text: result,
      });
    }
    catch (err) {
      log.debug('Error making request', err, 'for', file);
    }
  }
}

function deepAssign(obj, keyPath, value) {
  let lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

function deepRead(obj, keyPath) {
  let lastKeyIndex = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  return obj[keyPath[lastKeyIndex]];
}

export default function start() {
  runTasks();
  setInterval(runTasks, moment.duration(15, 'minutes').asMilliseconds());
}
