/// <reference types="types-for-adobe/Illustrator/2015.3"/>

import { defaultLogger as logger } from '../utils'
import { loadConfig } from './config'
import { exportArtboards } from './export'
;(() => {
  const doc = app.activeDocument

  const config = loadConfig(doc.path.fullName)
  logger.initialize(config.log)

  exportArtboards(doc, config)

  logger.flushStoredLogs()
})()
