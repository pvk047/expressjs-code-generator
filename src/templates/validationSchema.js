import { toTitleCase } from "../helpers/stringFormatHelpers"

export default ({ entity }) => {
  const titleCaseEntity = toTitleCase(entity)
  return `
  import  Joi from 'joi'

  import { stringErrorHandler, objectId, arrayErrorHandler, numberErrorHandler } from '../../../../helpers/joiHelpers'
  
  const JoiObjectId = objectId(Joi)

  const ${entity}DataSchema = {}
  
  export const create${titleCaseEntity}DataSchema = Joi.object().keys(${entity}DataSchema)
  
  export const update${titleCaseEntity}DataSchema= Joi.object().keys({
      _id: JoiObjectId().required().error(errors => stringErrorHandler(errors,'${titleCaseEntity} Id')),
      ...${entity}DataSchema
  })
  
  export const ${entity}DataSchema = Joi.object().keys({
    ${entity}_id: JoiObjectId().required().error(errors => stringErrorHandler(errors,'${titleCaseEntity} Id')),
  })
  `
}