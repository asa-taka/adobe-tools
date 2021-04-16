import { filter, forEach, getAiFiles, splitBy, some, map, find, isOpenedDocument, selectFolder } from '../lib/utils'
import { defaultLogger as logger } from '../lib/log'
import { loadConfig } from './config'

import { exportArtboardsAsPdf } from './export-composites-common'

const mapFilesByName = (files: File[], fileNames: string[]) => {
  return map(fileNames, fileName => find(files, f => f.name === fileName))
}

/**
 * reorderTargetFiles returns reordered `files`.
 * @param files 
 * @param orderConfig 
 * @returns 
 */
const reorderTargetFiles = (files: File[], orderConfig: string[]) => {
  const [beforeOthers, afterOthers] = splitBy(orderConfig, fileName => fileName === '...')
  const others = filter(files, f => !some(orderConfig, configuredFile => f.name === configuredFile))
  const result: File[] = []
  return result
    .concat(mapFilesByName(files, beforeOthers))
    .concat(others)
    .concat(mapFilesByName(files, afterOthers))
}

(() => {
  const targetDir = selectFolder("Select a folder contains 'composites.json'")
  const targetDirPath = targetDir.fullName

  const config = loadConfig(targetDirPath + "/composites.json");

  const files = getAiFiles(targetDirPath)
  const targetFiles = reorderTargetFiles(files, config.bulk.targets)

  forEach(targetFiles, f => {
    logger.log(`Export: ${f.name}`)
    const shouldClose = !isOpenedDocument(f.fullName)
    const doc = app.open(f)
    exportArtboardsAsPdf(doc, config)
    if (shouldClose) doc.close(SaveOptions.PROMPTTOSAVECHANGES)
  })
  
  if (config.options?.outputLog) {
    logger.print()
  }  
})()
