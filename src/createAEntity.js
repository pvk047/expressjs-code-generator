import { isFileExists } from './helpers/fileHelpers'
import { createAController } from './lib/generateController'
import { createADataServiceProvider } from './lib/generateDataServiceProvider'
import { createAModel } from './lib/generateModel'
import { createAValidationSchema } from './lib/generateValidationSchema'
import { createAListAPISchema } from './lib/generateListAPIDataSchema'

import config from './config/index'
const PROJECT_PATH = config.PROJECT_PATH


async function generateCode(entity) {
  if(!entity) {
    throw new Error(`ENTITY is Required.Please provide ENTITY via process.env.`)
  }
  await createAController(entity)
  await createAModel(entity)
  await createADataServiceProvider(entity)
  
  await createAValidationSchema(entity)
  await createAListAPISchema(entity)
}

(async function () {
  try {
    if(!isFileExists(PROJECT_PATH)) {
      throw new Error(`${PROJECT_PATH} is not Exists.Use generate-project or create it manually.`)
    }
    await generateCode(process.env.ENTITY)
  } catch (err) {
    console.log(err.stack)
  }
})()