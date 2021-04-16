/// <reference types="types-for-adobe/Illustrator/2015.3"/>

import { forEach, splitFileExtension } from '../lib/utils'
import { defaultLogger as logger } from '../lib/log'
import { getOutputConfig, Config } from './config'

const getArtboardPsdFileName = (path: string, fileName: string, artboardName: string) => {
  const [name, _] = splitFileExtension(fileName)
  return `${path}/${name}_${artboardName}.psd`
}

type MyExportOptionsPhotoshop = {
  outDir: Folder,
  dpi: number,
  dryRun?: boolean
  forceRemoveOldFiles?: boolean
}

export const exportArtboardsAsPsd = (doc: Document, options: MyExportOptionsPhotoshop) => {
  const { outDir } = options
  if (!outDir.exists) {
    alert(`${outDir} doesn't exist`)
    return
  }

  const outFile = new File(outDir.fullName + '/' + doc.name)
  if (options.forceRemoveOldFiles) {
    for (let a of doc.artboards) {
      const n = getArtboardPsdFileName(outDir.fullName, doc.name, a.name)
      const f = new File(n)
      if (f.exists) {
        f.remove()
        logger.log(`Remove old file: ${n}`)
      }
    }  
  }
  if (outFile.exists && options.forceRemoveOldFiles) {
    outFile.remove()
  }

  // 'any' for the static typed props issue.
  // https://github.com/bbb999/Types-for-Adobe/issues/69
  const opts = new ExportOptionsPhotoshop() as any

  opts.embedICCProfile = false
  opts.imageColorSpace = ImageColorSpace.CMYK
  opts.maximumEditability = false
  opts.resolution = o.dpi
  opts.saveMultipleArtboards = true
  opts.warnings = false
  opts.writeLayers = false

  doc.exportFile(outFile, ExportType.PHOTOSHOP, opts)
  logger.log(`Export artboards: ${outFile.fullName}`)
}


export const exportArtboardsAsPdf = (doc: Document, config: Config) => {
  const docDirPath = doc.path.fullName
  const out = getOutputConfig(config, doc.name)

  forEach(out, o => {
    exportArtboardsAsPsd(doc, {
      outDir: new Folder(docDirPath + '/' + o.dir),
      dpi: o.dpi,
      forceRemoveOldFiles: config.options?.forceRemoveOldFiles,
    })
  })
}
