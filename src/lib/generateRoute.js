
import path from 'path'

import { createFile, isFileExists, renameFile } from '../helpers/fileHelpers'


import config from '../config/index'
import { toPlural, toTitleCase } from '../helpers/stringFormatHelpers'
const routerConfig = config.routerConfig
const PROJECT_PATH = config.PROJECT_PATH


function getRouterContent({ entity, options, template }) { 
  return template({ entity, options })
}

async function createARoute(entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to Create Route.')
  }

  const mainPath = path.join(PROJECT_PATH, routerConfig.path)
  
  if (!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }

  const routePath = path.join(mainPath, `${toTitleCase(toPlural(entity))}.js`)

  if (isFileExists(routePath)) {
    const newPath = path.join(mainPath, `${toTitleCase(toPlural(entity))}.1.js`)
    renameFile(routePath, newPath)
  }

  const routerContent = getRouterContent({ entity, options: routerConfig.options, template: routerConfig.template })

  await createFile(routePath, routerContent)
}

async function generateRoutes(entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createARoute(entity)
  })
  await Promise.all(promiseArr)
  return
}

export {
  createARoute,
  generateRoutes
}