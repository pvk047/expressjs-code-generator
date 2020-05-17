import { toTitleCase, toPlural } from '../helpers/stringFormatHelpers'

function getDeletedBy({ softDelete = false, titleCaseEntity, entity }) {
  if (softDelete) {
    return `
    async delete${titleCaseEntity}ById (${titleCaseEntity}Id) {
      return ${titleCaseEntity}Model.updateOne(
        {
          _id: ${titleCaseEntity}Id
        },
        {
          $set: {
            status: 'DELETED',
            deleted_at: Date.now()
          }
        }
      )
    }
    `
  }

  return `
  async delete${titleCaseEntity}ById (${titleCaseEntity}Id) {
    return  ${titleCaseEntity}Model.deleteOne({_id: ${titleCaseEntity}Id})
  } 
  `
}



export default ({ entity, options = {
  softDelete: false
} }) => {
  const titleCaseEntity = toTitleCase(entity)
  const pluralEntity = toPlural(entity)

  return `
  import ${titleCaseEntity}Model from '../models/ ${titleCaseEntity}Model'

  export class ${titleCaseEntity}DataServiceProvider {
  
    async create${titleCaseEntity}(${entity}) {
      return ${titleCaseEntity}Model.create(${entity})
    }
  
    async get${titleCaseEntity}ById(${titleCaseEntity}Id) {
      return ${titleCaseEntity}Model.findById(${titleCaseEntity}Id)
    }
  
    async update${titleCaseEntity}ById(${titleCaseEntity}Id, ${entity}Details) {
      return ${titleCaseEntity}Model.updateOne(
        {
          _id: ${titleCaseEntity}Id
        },
        {
          $set: ${entity}Details
        }
      )
    }
   
    async get${toTitleCase(pluralEntity)} ({skip = null,limit = null ,query = {} ,sort = {} ,project = {}}) {
      return ${titleCaseEntity}Model.find(query).sort(sort).skip(skip).limit(limit).select(project)
    }
  
    ${getDeletedBy({ softDelete: options.softDelete, titleCaseEntity, entity })}
  
  }`
}