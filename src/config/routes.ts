import { generateRoutes } from '@/decorators';

module.exports = {
  preMiddlewares: ['* requestLog requestParseURLEncoded requestParseBody'],

  routes: generateRoutes(),

  postMiddlewares: [],
};
