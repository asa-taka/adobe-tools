import { find, some } from '../lib/utils'

export type OutputConfig = {
  dir: string
  dpi: number
}

export type TargetConfig = {
  
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
  options: {
    outputLog: boolean
    forceRemoveOldFiles: boolean
  }
}

export const loadConfig = (path: string) => {
  const file = new File(path)
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
