import defaultDataServiceProviderTemplate from '../templates/dataServiceProvider'
const softDelete = process.env.SOFT_DELETE || false
export default {
  path: 'services/database',
  options: {
    softDelete
  },
  template: defaultDataServiceProviderTemplate
}