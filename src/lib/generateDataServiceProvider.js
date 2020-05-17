import path from 'path'

import { createFile, isFileExists, renameFile } from '../helpers/fileHelpers'


import config from '../config/index'
const dataServiceProviderConfig = config.dataServiceProvider
const PROJECT_PATH = config.PROJECT_PATH

function getDataServiceProviderContent({ entity, options, template }) {
  return template({ entity, options })
}

async function createADataServiceProvider (entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to Create DataServiceProvider.')
  }

  const mainPath = path.join(PROJECT_PATH, dataServiceProviderConfig.path)

  if (!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }

  const dataServiceProviderPath = path.join(mainPath, `${entity}DataServiceProvider.js`)

  if (isFileExists(dataServiceProviderPath)) {
    const newPath = path.join(mainPath, `${entity}DataServiceProvider.1.js`)
    renameFile(dataServiceProviderPath, newPath)
  }

  const dataServiceProviderContent = getDataServiceProviderContent({ entity, options: dataServiceProviderConfig.options, template: dataServiceProviderConfig.template })

  await createFile(dataServiceProviderPath, dataServiceProviderContent)
}

async function generateDataServiceProviders (entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createADataServiceProvider(entity)
  })
  await Promise.all(promiseArr)
  return
}

export {
  generateDataServiceProviders,
  createADataServiceProvider
}