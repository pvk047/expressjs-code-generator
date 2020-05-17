import { toTitleCase } from "../helpers/stringFormatHelpers"

function getTimeStamps(timestamps) {
  if (timestamps) {
    return `
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
    `
  }

  return ''
}

function getModelWithCollectionName(titleCaseEntity, collectionName) {
  if (collectionName) {
    return `const ${titleCaseEntity}Model = mongoose.model('${titleCaseEntity}',${titleCaseEntity}Schema,'${collectionName}')`
  }

  return `const ${titleCaseEntity}Model = mongoose.model('${titleCaseEntity}',${titleCaseEntity}Schema)`
}

export default ({ entity, options = {
  timestamps: true,
  collectionName: null
} }) => {

  const titleCaseEntity = toTitleCase(entity)

  return `import mongoose from 'mongoose'

  const Schema = new mongoose.Schema

  const ${titleCaseEntity}Schema = new Schema({

  },
  {
    version_key: false,
    ${getTimeStamps(options.timestamps)},
  })


  ${getModelWithCollectionName(titleCaseEntity, options.collectionName)}

  export default ${titleCaseEntity}Model 
  `
}
