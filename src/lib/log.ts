export class Logger {
  private logs = ["Script Log"]

  constructor() {}

  log(s: string) {
    this.logs.push(s)
  }

  print() {
    alert(this.logs.join('\n'))
  }
}

export const defaultLogger = new Logger()
