import { filter, forEach, getAiFiles, splitBy, some, map, find, isOpenedDocument, selectFolder } from '../utils/utils'
import { defaultLogger as logger } from '../utils'
import { loadConfig } from './config'
import { exportArtboards } from './export'

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

  const config = loadConfig(targetDirPath)
  logger.initialize(config.log)
  logger.log('Target Directory: ' + targetDir)

  const files = getAiFiles(targetDirPath)
  const targetFiles = reorderTargetFiles(files, config.bulk.targets)
  logger.log('Target Files and Order:\n' + map(targetFiles, f => `\t${f.name}`).join('\n'))

  forEach(targetFiles, f => {
    logger.log(`Export: ${f.name}`)
    const shouldClose = !isOpenedDocument(f.fullName)
    const doc = app.open(f)
    exportArtboards(doc, config)
    if (shouldClose) doc.close(SaveOptions.PROMPTTOSAVECHANGES)
  })
  
  logger.flushStoredLogs()
})()
