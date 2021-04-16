/// <reference types="types-for-adobe/Illustrator/2015.3"/>

import { loadConfig } from './config'
import { defaultLogger as logger } from '../lib/log'

import { exportArtboardsAsPdf } from './export-composites-common'

(() => {
  /** The active document */
  const doc = app.activeDocument

  const config = loadConfig(doc.path.fullName + "/composites.json");
  exportArtboardsAsPdf(doc, config)  

  if (config.options?.outputLog) {
    logger.print()
  }  
})()
