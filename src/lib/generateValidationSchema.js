
import path from 'path'

import { createFile, isFileExists, renameFile,createADirectory } from '../helpers/fileHelpers'


import config from '../config/index'
const validationSchemaConfig = config.validationSchemaConfig
const PROJECT_PATH = config.PROJECT_PATH


function getValidationSchemaContent({ entity, options, template }) {
  return template({ entity, options })
}

async function createAValidationSchema(entity) {
  if (!PROJECT_PATH) {
    throw new Error('PROJECT_PATH is Required to Create Validation Schema.')
  }

  const mainPath = path.join(PROJECT_PATH, validationSchemaConfig.path,entity)

  if(!isFileExists(mainPath)) {
    createADirectory(mainPath)
  }

  const validationSchemaPath = path.join(mainPath,`${entity}DataSchema.js`)

  if (isFileExists(validationSchemaPath)) {
    const newPath = path.join(mainPath, `${entity}DataSchema.1.js`)
    renameFile(validationSchemaPath, newPath)
  }

  const validationSchemaContent = getValidationSchemaContent({ entity, options: validationSchemaConfig.options, template: validationSchemaConfig.template })

  await createFile(validationSchemaPath, validationSchemaContent)
}

async function generateValidationSchemas(entityList) {
  const promiseArr = (entityList || []).map(entity => {
    return createAValidationSchema(entity)
  })
  await Promise.all(promiseArr)
  return
}

export {
  createAValidationSchema,
  generateValidationSchemas
}

