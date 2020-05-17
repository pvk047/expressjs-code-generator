
import path from 'path'

import { createFile, isFileExists, renameFile } from '../helpers/fileHelpers'


import config from '../config/index'

const modelConfig = config.model

const PROJECT_PATH = config.PROJECT_PATH

async function generateModels(entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createAModel(entity)
  })
  await Promise.all(promiseArr)
  return
}

function getModelContent({ entity, options, template }) {
  return template({ entity, options })
}

async function createAModel(entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to Create Model.')
  }

  const mainPath = path.join(PROJECT_PATH, modelConfig.path)
  if (!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }
  
  const modelPath = path.join(mainPath, `${entity}Model.js`)

  if (isFileExists(modelPath)) {
    const newPath = path.join(mainPath, `${entity}Model.1.js`)
    renameFile(modelPath, newPath)
  }

  const modelContent = getModelContent({ entity, options: modelConfig.options, template: modelConfig.template })

  await createFile(modelPath, modelContent)
}


export {
  createAModel
}