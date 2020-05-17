import defaultControllerTemplate from '../templates/controller'

import dotenv from 'dotenv'
dotenv.config()
const getEntityFromAuthDetails = process.env.GET_ENTITY_FROM_AUTH_DETAILS || false

export default {
  path: 'controllers',
  options: {
    getEntityFromAuthDetails,
  },
  template: defaultControllerTemplate
}