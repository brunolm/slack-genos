interface BtdSettings {
  company?: string;
  user: string;
  pass: string;
  lunchAt?: string;
  lunchTime?: number;
  tolerance?: number;
  workHours?: number;
  monthYear?: string;
  showGrid?: boolean;
  verbose?: boolean;
  notifications?: boolean;
  noNotifications?: boolean;
  debug?: boolean;
}

export function getSettings(settings: BtdSettings) {
  const config = settings || {} as BtdSettings;

  const result = {
    company: config.company || process.env.AHGORA_COMPANY,
    user: config.user,
    pass: config.pass,
    lunchAt: config.lunchAt || process.env.AHGORA_LUNCHAT || '11:30',
    lunchTime: config.lunchTime || +process.env.AHGORA_LUNCHTIME || 60,
    tolerance: config.tolerance || +process.env.AHGORA_TOLERANCE || 10,
    workHours: config.workHours || +process.env.AHGORA_WORKHOURS || 8,
    monthYear: config.monthYear,
    showGrid: config.showGrid || false,
    verbose: config.verbose || false,
    notifications: !config.noNotifications,
    noNotifications: config.noNotifications || false,
    debug: false,
  };

  if (result.verbose || result.monthYear) {
    result.showGrid = true;
    result.verbose = true;
  }

  return result;
}


export const getArg = (args: string[], arg: string): string => {
  const result = args.indexOf(arg);
  if (result !== -1) {
    return args[result + 1];
  }
  return undefined;
};

export const parseArgs = (args) => {
  const cmdArgs = {
    user: getArg(args, '-u'),
    pass: getArg(args, '-p'),
    company: getArg(args, '-c'),
    lunchAt: getArg(args, '-a'),
    lunchTime: +getArg(args, '-l'),
    tolerance: +getArg(args, '-t'),
    workHours: getArg(args, '-w'),
    monthYear: getArg(args, '-m'),
    showGrid: args.indexOf('-s') !== -1,
    verbose: args.indexOf('-v') !== -1,
    forceNocache: args.indexOf('-f') !== -1,
    noNotifications: args.indexOf('-n') !== -1,
    debug: false,
  };

  if (cmdArgs.verbose || cmdArgs.monthYear) {
    cmdArgs.showGrid = true;
    cmdArgs.verbose = true;
  }

  return Object.keys(cmdArgs).reduce((a, key) => {
    if (typeof cmdArgs[key] !== 'undefined' && !isNaN(cmdArgs[key])) {
      a[key] = cmdArgs[key];
    }
    return a;
  }, {});
};

export const validateOptions = options => {
  if (!options.user) {
    throw new Error('Missing parameter `-u <user>`');
  }

  if (!options.pass) {
    throw new Error('Missing parameter ` -p <pass>`');
  }

  if (!options.company) {
    throw new Error('Missing parameter `-c <company>`');
  }

  if (options.monthYear && !/^[0-1][0-9]-2\d{3}$/.test(options.monthYear)) {
    throw new Error('Invalid parameter `-m`, use `-m <MM-YYYY>`');
  }
};
