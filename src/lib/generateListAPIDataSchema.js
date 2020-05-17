
import path from 'path'

import { createFile, isFileExists, renameFile } from '../helpers/fileHelpers'

import { toTitleCase, toPlural } from '../helpers/stringFormatHelpers'


import config from '../config/index'
const listAPISchemaConfig = config.listAPISchemaConfig
const PROJECT_PATH = config.PROJECT_PATH


function getListAPIDataSchemaContent({ entity, options, template }) {
  return template({ entity, options })
}

async function createAListAPISchema(entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to List API Validation Schema.')
  }

  const mainPath = path.join(PROJECT_PATH, listAPISchemaConfig.path, entity)

  if (!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }
  const listAPISchemaPath = path.join(mainPath, `list${toTitleCase(toPlural(entity))}DataSchema.js`)

  if (isFileExists(listAPISchemaPath)) {
    const newPath = path.join(mainPath, `list${toTitleCase(toPlural(entity))}DataSchema.1.js`)
    renameFile(listAPISchemaPath, newPath)
  }

  const listAPISchemaContent = getListAPIDataSchemaContent({ entity, options: listAPISchemaConfig.options, template: listAPISchemaConfig.template })

  await createFile(listAPISchemaPath, listAPISchemaContent)
}

async function generateListAPISchemas(entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createAListAPISchema(entity)
  })
  await Promise.all(promiseArr)
  return
}

export {
  createAListAPISchema,
  generateListAPISchemas
}

