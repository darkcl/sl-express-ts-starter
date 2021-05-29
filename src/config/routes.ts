import { routeList, controllerTable } from '../decorators';
import { join } from 'path';

const PublicController = require('../api/controllers/PublicController');

new PublicController();

const generateRoutes = () => {
  return routeList.map((r) => {
    return `${r.type.toUpperCase()} ${join('/', controllerTable[r.target].basePath, r.path)} ${r.target}.${r.name}`;
  });
};

module.exports = {
  preMiddlewares: ['* requestLog requestParseURLEncoded requestParseBody'],

  routes: generateRoutes(),

  postMiddlewares: [],
};
