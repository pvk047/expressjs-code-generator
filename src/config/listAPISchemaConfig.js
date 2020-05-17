import listAPIValidationDataSchemaTemplate from '../templates/listEntitiesValidationDataSchema'

const sortByOptions = process.env.SORT_BY_FIELDS || `['created_at', 'updated_at']`

const sortingOrder = process.env.SORT_ORDER || 'desc'

const defaultSortBy = process.env.SORT_BY || 'updated_at'

const defaultLimit = process.env.defaultLimit || 10



export default {
  path: 'middlewares/validations/schema',
  options: {
    sortByOptions,
    sortingOrder,
    defaultSortBy,
    defaultLimit
  },
  template: listAPIValidationDataSchemaTemplate,
}