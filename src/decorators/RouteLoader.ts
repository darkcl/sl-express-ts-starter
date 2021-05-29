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
    return `${r.type.toUpperCase()} ${path.join('/', controllerTable[r.target].basePath, r.path)} ${r.target}.${
      r.name
    }`;
  });
};
