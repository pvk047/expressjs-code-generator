import fs from 'fs'
async function createFile(filePath,content) {

  return new Promise((resolve,reject) => {
    fs.writeFile(filePath,content,(err,result) => {
      if(err) {
        reject(err)
      }
      console.log('[*]',filePath)
      resolve(result)
    })
  })
}

async function createADirectory(directoryPath,options= null) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath,options, (err, result) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log(`${directoryPath} Already Existed`)
          resolve({
            status: `${directoryPath} Already Existed`
          })
        }
        reject(err)
      }
      console.log(`${directoryPath} Created Successfully`)
      resolve({
        status: `${directoryPath} Created Successfully`
      })
    })
  })
}

function isFileExists(filePath) {
  return fs.existsSync(filePath)
}
function renameFile(oldPath,newPath) {
  return fs.renameSync(oldPath, newPath)
}

export {
  createADirectory,
  createFile,
  isFileExists,
  renameFile
}