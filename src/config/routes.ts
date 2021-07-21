import { generateRoutes } from '@/decorators';

module.exports = {
  preMiddlewares: ['* requestLog requestParseURLEncoded requestParseBody'],

  routes: ['GET /old OldController.get', ...generateRoutes()],

  postMiddlewares: [],
};
