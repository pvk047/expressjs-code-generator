
export default ({options}) => {

  return `
import  Joi from 'joi'

import { stringErrorHandler, objectId, arrayErrorHandler, numberErrorHandler } from '../../../../helpers/joiHelpers'
  
const allowedSortFields = ${options.sortByOptions}

const listDataSchema = Joi.object().keys({
    page: Joi.number().min(1).error(numberErrorHandler),
    limit: Joi.number().min(1).max(100).error(numberErrorHandler).default(${options.defaultLimit}),
    order_by: Joi.string()
        .valid(allowedSortFields).error(stringErrorHandler).default('${options.defaultSortBy}'),
    order_type: Joi.string().valid('asc', 'desc').error(stringErrorHandler).default('${options.sortingOrder}'),
    get_all: Joi.boolean(),
    search_string: Joi.string().min(1).error(stringErrorHandler)
})
  .nand('get_all', 'page')
  .nand('get_all', 'limit')

export default listDataSchema

`
}