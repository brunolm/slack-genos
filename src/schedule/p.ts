import * as memory from '../services/memory';
import * as momentRaw from 'moment';
import * as momentTz from 'moment-timezone';
import * as path from 'path';

import AhgoraService from 'btd-ahgora/built/ahgora-service';
import { findFiles } from '../services/file';
import logger from '../logger';

const log = logger('btd:notifications');

const timers = {};

async function runTasks() {
  const mem = await memory.load();
  const files = await findFiles('usersettings/*.json');

  for (const file of files) {
    try {
      const settings = require(path.join(__dirname, '../../', file));

      const moment = (...args) => momentTz(...args).tz(settings.tz || 'America/Sao_Paulo');

      const service = new AhgoraService(settings.btd);

      if (!settings.btd.user && !settings.btd.pass) {
        continue;
      }

      await service.login();

      const dataTime = await service.getTimes();
      const today = service.getToday(dataTime.times);

      /** DEBUG *
      dataTime.times[moment().format('DD/MM/YYYY')].beats = [
        '07:00',
        '11:30',
        '12:30',
        // '17:00',
      ];
      dataTime.times[moment().format('DD/MM/YYYY')].beatsRaw = dataTime.times[moment().format('DD/MM/YYYY')].beats.join(', ');
      /**/

      const result = service.parseResult(dataTime.times);

      if (today.beats.length <= 1) {
        continue;
      }

      const deepKey = ['btd', 'notifications', settings.id, today.beats.length];

      // check if notification was already sent
      let hasFirst = false;
      let hasSecond = false;

      const notificationFromMem = deepRead(mem, deepKey);
      if (notificationFromMem) {
        const isFromToday = moment(notificationFromMem.date) >= moment().startOf('day')
          && moment(notificationFromMem.date) <= moment().endOf('day');

        if (isFromToday) {
          hasFirst = notificationFromMem.first;
          hasSecond = notificationFromMem.second;

          if (hasFirst && hasSecond) {
            continue;
          }
        }
      }

      // if there isn't memory or timer then start one
      if (!notificationFromMem || !hasSecond) {
        const timer = deepRead(timers, deepKey);

        if (!timer) {
          const secondNotifyAt = moment(result.match(/(\d{2}:\d{2})/)[1], 'HH:mm').add(-2, 'minutes');

          deepAssign(timers, deepKey, setInterval(() => {
            const memOfNotification = deepRead(mem, deepKey);

            if (memOfNotification.second) {
              clearInterval(timer);
              return;
            }

            if (moment() >= secondNotifyAt) {
              deepAssign(mem, deepKey, {
                first: true,
                second: true,
                secondNotifyAt,
                date: moment(),
              });
              memory.set({ ...mem });

              process.send({
                channel: settings.id,
                text: `:warning: <@${settings.id}> --> ${result}`,
              });

              clearInterval(timer);
            }
          }, 5000));

          deepAssign(mem, deepKey, {
            first: true,
            second: false,
            secondNotifyAt,
            date: moment(),
          });

          memory.set({ ...mem });
        }
      }

      if (!hasFirst) {
        process.send({
          channel: settings.id,
          text: result,
        });
      }
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
  setInterval(runTasks, momentRaw.duration(12, 'minutes').asMilliseconds());
}
