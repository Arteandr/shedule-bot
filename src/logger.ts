export interface Logger {
  log: (message: string) => void;
  fatal: (message: string) => void;
}

export class AppLogger implements Logger {
  private get timestamp() {
    return new Date().toLocaleString('ru-RU');
  }

  log(message: string) {
    console.log(`${this.timestamp} - [LOG] ${message}`);
  }

  fatal(error: any) {
    console.table(error);
    console.log(`${this.timestamp} - [ERROR] ${error}`);
    process.exit(1);
  }
}
