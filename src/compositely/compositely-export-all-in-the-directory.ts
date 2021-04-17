import { filter, forEach, getAiFiles, splitBy, some, map, find, isOpenedDocument, selectFolder } from '../utils/utils'
import { defaultLogger as logger } from '../utils'
import { loadConfig, CompositeConfig } from './config'
import { exportArtboards } from './export'

const mapFilesByName = (files: File[], names: string[]) => {
  return map(names, fileName => find(files, f => f.name === fileName))
}

const filterOutFilesByNames = (files: File[], names: string[]) => {
  return filter(files, f => !some(names, n => f.name === n))
}

const getOrderedTargetFiles = (files: File[], config: CompositeConfig) => {
  const seq = config.sequence
  const [beforeOthers, afterOthers] = splitBy(seq, fileName => fileName === '...')
  const others = filterOutFilesByNames(files, [].concat(seq, config.exclude))
  return mapFilesByName(files, beforeOthers).concat(others, mapFilesByName(files, afterOthers))
}

(() => {
  const targetDir = selectFolder("Select a folder contains 'composites.json'")
  const targetDirPath = targetDir.fullName

  const config = loadConfig(targetDirPath)
  logger.initialize(config.log)
  logger.log('Target Directory: ' + targetDir)

  const files = getAiFiles(targetDirPath)
  const targetFiles = getOrderedTargetFiles(files, config.composite)
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
