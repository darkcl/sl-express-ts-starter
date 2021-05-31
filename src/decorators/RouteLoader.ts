import { routeList, controllerTable } from './RoutingDecorators';
import * as path from 'path';
import { readdirSync } from 'fs';

export const generateRoutes = () => {
  readdirSync(path.join(__dirname, '../api/controllers')).forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file.replace('.js', '');
      const Klass = require('../api/controllers/' + file);
      new Klass();
    }
  });

  console.log('[Route] Loading route with decorator');

  return routeList.map((r) => {
    const result = [];
    result.push(r.type.toUpperCase());

    if (r.path.length !== 0) {
      result.push(path.join('/', controllerTable[r.target].basePath));
    } else {
      result.push(path.join('/', controllerTable[r.target].basePath, r.path));
    }

    if (r.middlewares.length !== 0) {
      result.push(r.middlewares.join(' '));
    }
    result.push(`${r.target}.${r.name}`);
    console.log('Adding Route: ', result.join(' '));
    return result.join(' ');
  });
};
