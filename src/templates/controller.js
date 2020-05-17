function getGetEntityById({ getEntityFromAuthDetails = false, titleCaseEntity, entity }) {

  if (getEntityFromAuthDetails) {
    return `
    async get${titleCaseEntity}ById (req,res,next) {
      try{
        const ${entity} = req.locals.${entity}_details
  
        return res.status(201).json({
          success: true,
          message: '${titleCaseEntity} Details Fetched Successfully',
          data:  ${entity}  || {}
        })
      }catch(err) {
        return next(err)
      }
    }
    `
  }

  return `
  async get${titleCaseEntity}ById (req,res,next) {
    try{
      const ${entity}Id = req.params.${entity}_id

      const ${entity} = await ${titleCaseEntity}DataServiceProvider.get${titleCaseEntity}ById(${entity}Id);

      return res.status(201).json({
        success: true,
        message: '${titleCaseEntity} Details Fetched Successfully',
        data: ${entity}  || {}
      })
    }catch(err) {
      return next(err)
    }
  }
  `
}

import { toTitleCase, toPlural } from '../helpers/stringFormatHelpers'

export default ({ entity, options = {
  getEntityFromAuthDetails: false
} }) => {

  const titleCaseEntity = toTitleCase(entity)
  const pluralEntity = toPlural(entity)

  return `import ${titleCaseEntity}DataServiceProvider from '../services/database/${titleCaseEntity}DataServiceProvider'
  
  const  ${entity}DataServiceProvider = new  ${titleCaseEntity}DataServiceProvider()
  
  export class ${titleCaseEntity}Controller {
  
    async create${titleCaseEntity}(req,res,next) {
      try{
        const ${entity} = req.body
  
        const saved${titleCaseEntity} = await ${entity}DataServiceProvider.create${titleCaseEntity}(${entity})
  
        return res.status(201).json({
          success: true,
          message: '${entity} Saved Successfully',
          data: saved${titleCaseEntity}  || {}
        })
      }catch(err) {
        return next(err)
      }
    }
  
    ${getGetEntityById({ getEntityFromAuthDetails: options.getEntityFromAuthDetails, titleCaseEntity, entity })}
  
    async get${toTitleCase(pluralEntity)} (req,res,next) {
      try{
        const {skip,limit,query,sort,project} = req.local.parsedFilterParams
  
        const [${pluralEntity.toLowerCase()} = [],count = 0] = await ${entity}DataServiceProvider.get${toTitleCase(pluralEntity)}({skip,limit,query,sort,project})
  
        const page = req.query.page || 1;
  
        const responseData = PaginationHelper.getPaginationResponse({
          page,
          count,
          limit,
          skip,
          data: ${pluralEntity.toLowerCase()},
          data_field: 'data',
          message: '${toTitleCase(pluralEntity)} fetched successfully.',
        });
  
        return res.json(responseData)
      }catch(err) {
        return next(err)
      }
    }
  
    async update${titleCaseEntity}ById(req,res,next) {
      try{
        const ${entity}Id = req.params.${entity}_id
  
        const ${titleCaseEntity}Details = req.body
  
        await ${entity}DataServiceProvider.update${titleCaseEntity}ById(${entity}Id,${titleCaseEntity}Details)
  
        return res.json({
          success: true,
          message: '${titleCaseEntity} Details Update Successfully.'
        })
  
      }catch(err) {
        return next(err)
      }
    }
  
    async delete${titleCaseEntity}ById(req,res,next) {
      try {
        const ${entity}Id = req.params.${entity}Id
       
        await ${entity}DataServiceProvider.delete${titleCaseEntity}ById(${entity}Id)
        
        return res.json({
            success: true,
            message: '${titleCaseEntity} Deleted Successfully.'
        })
      }catch(err) {
        return next(err)
      }
    }
  
  }`
}
