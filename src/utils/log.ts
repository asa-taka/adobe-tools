import { resolvePathByActiveDocument } from './utils'

export type LoggerOutputType = 'alert' | 'file' | 'console'

export type LoggerOptions = {
  outputType?: LoggerOutputType
  outputFile?: string
}

export class Logger {
  private logs: string[] = []
  private options: LoggerOptions = {}
  private logFile: File | undefined

  initialize(options: LoggerOptions = {}) {
    this.options = options

    if (this.isFileLogger()) {
      const logFileName = this.options.outputFile || 'composites.log'
      this.logFile = new File(resolvePathByActiveDocument(logFileName))
      this.logFile.open('w')
    }

    this.log('JavaScript Engine: ' + $.version)
    this.log('Script: ' + $.fileName)
  }

  isAlertLogger() {
    return this.options.outputType === 'alert'
  }

  isFileLogger() {
    return this.options.outputType === 'file'
  }

  log(s: string) {
    $.writeln(s)
    if (this.isAlertLogger()) {
      this.logs.push(s)
    }
    if (this.isFileLogger()) {
      this.logFile?.writeln(s)
    }
  }

  /** Print all unprinted logs. Currentry, for 'alert' type Logger. */
  flushStoredLogs() {
    if (this.isAlertLogger()) {
      this.logs.unshift('Script Log')
      alert(this.logs.join('\n'))
    }
  }

  finalize() {
    this.flushStoredLogs()
    if (this.isFileLogger()) {
      this.logFile?.close()
    }
  }
}

export const defaultLogger = new Logger()
