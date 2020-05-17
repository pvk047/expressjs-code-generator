import fs from 'fs'

import path from 'path'
const BASE_PATH = '/home/bolt/Projects'

import { generateController } from './generateController'

import { createADirectory, createFile } from '../helpers/fileHelpers'

async function generateProject(projectName) {
  const mainPath = path.join(BASE_PATH, projectName)
  const result = await createAllProjectFolders(mainPath)
  return mainPath
}



async function createAllProjectFolders(mainPath){
  const folders = ['controllers','models','services/database','routes','middlewares/validations/schema','test','constants','helpers','seeders']
 const promiseArr =  folders.map(folder => {
    const folderPath = path.join(mainPath,folder)
    return createADirectory(folderPath,{recursive: true})
  })
  const result = await Promise.all(promiseArr)

  await createFile(path.join(mainPath,'app.js'),`console.log('Hello world')`)
}




export {
  generateProject
}