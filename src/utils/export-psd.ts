/// <reference types="types-for-adobe/Illustrator/2015.3"/>

import { splitFileExtension, defaultLogger as logger } from '../utils'

const getArtboardFileName = (path: string, fileName: string, artboardName: string) => {
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
      const n = getArtboardFileName(outDir.fullName, doc.name, a.name)
      const f = new File(n)
      if (f.exists) {
        f.remove()
        logger.log(`Remove old file: ${n}`)
      }
    }  
  }

  // 'any' for the static typed props issue.
  // https://github.com/bbb999/Types-for-Adobe/issues/69
  const opts = new ExportOptionsPhotoshop() as any

  opts.embedICCProfile = false
  opts.imageColorSpace = ImageColorSpace.CMYK
  opts.maximumEditability = false
  opts.resolution = options.dpi
  opts.saveMultipleArtboards = true
  opts.warnings = false
  opts.writeLayers = false

  doc.exportFile(outFile, ExportType.PHOTOSHOP, opts)
  logger.log(`Export artboards: ${outFile.fullName}`)
}
