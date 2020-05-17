import model from './modelConfig'
import controller from './controllerConfig'
import dataServiceProvider from './dataServiceProviderConfig'
import validationSchemaConfig from './validationSchemaConfig'
import listAPISchemaConfig from './listAPISchemaConfig'

import dotenv from 'dotenv'
dotenv.config()
import path from 'path'

if(!process.env.BASE_PATH) {
  throw new Error('BASE_PATH is Required.Please add BASE_PATH in .env')
}

if(!process.env.PROJECT) {
  throw new Error('PROJECT path is Required.Please pass PROJECT through command line arguments or add in .env')
}

const projectPath = path.join(process.env.BASE_PATH,process.env.PROJECT)

export default {
  controller,
  model,
  dataServiceProvider,
  validationSchemaConfig,
  listAPISchemaConfig,
  PROJECT_PATH: projectPath
}