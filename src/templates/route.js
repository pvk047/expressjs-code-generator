import { toPlural, toTitleCase } from '../helpers/stringFormatHelpers'
// TODO: auth middleware for entity level access control to be added


function getListAPIMiddlewares(authorization) {
  if (authorization) {
    return `[
      authMiddleware.checkAuthHeader,
      authMiddleware.validateAccessToken,
      validateRequest,
      customValidationMiddleware.parseSkipAndLimitAndSortParams
    ]`
  }

  return `[
    validateRequest,
    customValidationMiddleware.parseSkipAndLimitAndSortParams
  ]`
}
function getAuthMiddlewares(authorization) {
  if (authorization) {
    return `[
      authMiddleware.checkAuthHeader,
      authMiddleware.validateAccessToken,
      validateRequest,
    ]`
  }
  return 'validateRequest'
}

export default ({
  entity, options = {
    authorization: true
  }

}) => {


  const titleCaseEntity = toTitleCase(entity)
  const pluralEntity = toPlural(entity)
  const controller = `${entity}Controller`

  return `
  import { Router } from "express"
  
  import { SchemaValidator } from "../middlewares/validations/schemaValidator"
  import { CustomValidationMiddleware } from "../middlewares/customValidationMiddleware"
  import authMiddleware from "../middlewares/authMiddleware"

  import { ${titleCaseEntity}Controller } from "../controllers/${entity}Controller"
  const ${controller} = new ${titleCaseEntity}Controller()
  
  const customValidationMiddleware = new CustomValidationMiddleware()
  const schemaValidator = new SchemaValidator(true)
  const validateRequest = schemaValidator.validate()
  
  const router = Router()

  router.post(
    '/${pluralEntity}',
    ${getAuthMiddlewares(options.authorization)},
    ${controller}.create${titleCaseEntity}
  )

  router.put(
    '/${pluralEntity}',
    ${getAuthMiddlewares(options.authorization)},
    ${controller}.update${titleCaseEntity}
  )

  router.get(
    '/${pluralEntity}',
    ${getListAPIMiddlewares(options.authorization)},
    ${controller}.getAll${toTitleCase(pluralEntity)}
  )

  router.get(
    '/${pluralEntity}/:${entity}_id',
    ${getAuthMiddlewares(options.authorization)},
    ${controller}.get${titleCaseEntity}ById
  )

  router.delete(
    '/${pluralEntity}/:${entity}_id',
    ${getAuthMiddlewares(options.authorization)},
    ${controller}.delete${titleCaseEntity}ById
  )

  export default router
  `
}