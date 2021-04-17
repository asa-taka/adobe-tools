export type LoggerOutputType = 'alert' | 'file' | 'none'

export type LoggerOptions = {
  outputType?: LoggerOutputType
  outputFile?: string
}

export class Logger {
  private logs: string[] = []
  private options: LoggerOptions = {}

  initialize(options: LoggerOptions = {}) {
    this.options = options
    this.log('JavaScript Engine: ' + $.version)
    this.log('Script: ' + $.fileName)
  }

  isAlertLogger() {
    return this.options.outputType === 'alert'
  }

  log(s: string) {
    $.writeln(s)
    if (this.isAlertLogger()) {
      this.logs.push(s)
    } else {
      // TODO: outputType: 'file'
    }
  }

  /** Print all unprinted logs. Currentry, for 'alert' type Logger. */
  flushStoredLogs() {
    if (this.isAlertLogger()) {
      this.logs.unshift('Script Log')
      alert(this.logs.join('\n'))
    }
  }
}

export const defaultLogger = new Logger()
