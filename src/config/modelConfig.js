import defaultModelTemplate from '../templates/model'
const collectionName = process.env.COLLECTION_NAME || null
const timestamps = process.env.TIMESTAMPS || true

export default {
  path: 'models',
  options : {
    timestamps,
    collectionName
  },
  template: defaultModelTemplate
}