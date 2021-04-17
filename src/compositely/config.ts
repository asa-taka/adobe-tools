import { find, some, LoggerOptions } from '../utils'

export type OutputConfig = {
  dir: string
  dpi: number
}

export type Config = {
  default: {
    out: OutputConfig[]
  }
  targets: {
    sources: string[]
    out: OutputConfig[]
  }[]
  bulk: {
    targets: string[]
  }
  log: LoggerOptions,
  options: {
    outputLog: boolean
    forceRemoveOldFiles?: boolean
  }
}

const CONFIG_FILE_NAME = 'composites.json'

export const loadConfig = (dirPath: string) => {
  const file = new File(dirPath + '/' + CONFIG_FILE_NAME)
  if (!file.exists) throw new Error(`File ${file} not found`)
  file.open("r")
  const s = "(" + file.read() + ")"
  file.close()
  return eval(s) as Config
}

export const getOutputConfig = (config: Config, fileName: string) => {
  const targetConf = find(config.targets, t => some(t.sources, s => s === fileName))
  return targetConf ? targetConf.out : config.default.out
}
