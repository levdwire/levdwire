import chalk from 'chalk';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export class Logger {
  static info(message: string): void {
    console.info(
      chalk.hex('#a78bfa').bold('[Levdwire info]:') + ' ' +
      chalk.gray(message)
    );
  }

  static warn(message: string): void {
    console.warn(
      chalk.hex('#fbbf24').bold('[Levdwire warn]:') + ' ' +
      chalk.gray(message)
    );
  }

  static error(message: string): void {
    console.error(
      chalk.hex('#f87171').bold('[Levdwire error]:') + ' ' +
      chalk.gray(message)
    );
  }

  static debug(message: string): void {
    console.debug(
      chalk.hex('#38bdf8').bold('[Levdwire debug]:') + ' ' +
      chalk.gray(message)
    );
  }

  static log(level: LogLevel, message: string): void {
    switch (level) {
      case 'info': return this.info(message);
      case 'warn': return this.warn(message);
      case 'error': return this.error(message);
      case 'debug': return this.debug(message);
    }
  }
}
