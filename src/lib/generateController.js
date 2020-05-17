
import path from 'path'

import { createFile, isFileExists, renameFile } from '../helpers/fileHelpers'


import config from '../config/index'
const controllerConfig = config.controller
const PROJECT_PATH = config.PROJECT_PATH


function getControllerContent({ entity, options, template }) {
  return template({ entity, options })
}

async function createAController(entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to Create Controller.')
  }

  const mainPath = path.join(PROJECT_PATH, controllerConfig.path)
  
  if (!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }

  const controllerPath = path.join(mainPath, `${entity}Controller.js`)

  if (isFileExists(controllerPath)) {
    const newPath = path.join(mainPath, `${entity}Controller.1.js`)
    renameFile(controllerPath, newPath)
  }

  const controllerContent = getControllerContent({ entity, options: controllerConfig.options, template: controllerConfig.template })

  await createFile(controllerPath, controllerContent)
}

async function generateControllers(entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createAController(entity)
  })
  await Promise.all(promiseArr)
  return
}

export {
  createAController,
  generateControllers
}