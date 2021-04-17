import { forEach, exportArtboardsAsPsd } from '../utils'
import { getOutputConfig, Config } from './config'

export const exportArtboards = (doc: Document, config: Config) => {
  const docDirPath = doc.path.fullName
  const out = getOutputConfig(config, doc.name)

  forEach(out, o => {
    exportArtboardsAsPsd(doc, {
      outDir: new Folder(docDirPath + '/' + o.dir),
      dpi: o.dpi,
      forceRemoveOldFiles: config.forceRemoveOldFiles,
    })
  })
}
