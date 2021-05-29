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

  return routeList.map((r) => {
    const result = [];
    result.push(r.type.toUpperCase());
    result.push(path.join('/', controllerTable[r.target].basePath, r.path));
    if (r.middlewares.length !== 0) {
      result.push(r.middlewares.join(' '));
    }
    result.push(`${r.target}.${r.name}`);
    return result.join(' ');
  });
};
