/// <reference types="types-for-adobe/Illustrator/2015.3"/>

import { loadConfig } from './config'
import { defaultLogger as logger } from '../utils'

import { exportArtboards } from './export'

(() => {
  /** The active document */
  const doc = app.activeDocument

  const config = loadConfig(doc.path.fullName);
  exportArtboards(doc, config)  

  if (config.options?.outputLog) {
    logger.print()
  }  
})()
