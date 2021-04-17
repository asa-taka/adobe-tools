import { find, some, LoggerOptions } from '../utils'

export type OutputConfig = {
  dir: string
  dpi: number
}

export type ExportTargetConfig = {
  sources: string[]
  out: OutputConfig[]
}

export type CompositeConfig = {
  exclude: string[]
  /**
   * Speficy composite sequence by file names.
   * The first item will be processed first and so on, respectively.
   * A special name `'...'` is available to represents other files.
   */
  sequence: string[]
}

export type Config = {
  export: {
    default: ExportTargetConfig
    targets: ExportTargetConfig[]
  }
  composite: CompositeConfig
  log: LoggerOptions,
  forceRemoveOldFiles?: boolean
}

const CONFIG_FILE_NAME = 'composites.json'

export const loadConfig = (dirPath: string): Config => {
  const file = new File(dirPath + '/' + CONFIG_FILE_NAME)
  if (!file.exists) throw new Error(`File ${file} not found`)
  file.open("r")
  const s = "(" + file.read() + ")"
  file.close()
  return eval(s)
}

export const getOutputConfig = (config: Config, fileName: string): OutputConfig[] => {
  const targetConf = find(config.export.targets, t => some(t.sources, s => s === fileName))
  return targetConf ? targetConf.out : config.export.default.out
}
