import { createLogger, format, transports, addColors } from 'winston';

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

addColors(config.colors);

const customFormat = format.printf(({ level, message, label }) => {
  return `${label} ${level}: ${message}`;
});

const logger = createLogger({
  levels: config.levels,

  format: format.combine(
    format.json(),
    format.colorize(),
    format.timestamp(),
    format.label({ label: '[API]' }),
    customFormat
  ),
  transports: [new transports.Console()]
});

export default logger;
