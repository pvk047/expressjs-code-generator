import defaultRouteTemplate from '../templates/route'

const authorization = process.env.AUTHORIZATION || true
// TODO: auth middleware for entity level access control to be added
export default {
  path: 'routes',
  options: {
    authorization 
  },
  template: defaultRouteTemplate,
}