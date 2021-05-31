import * as path from 'path';
import { readdirSync } from 'fs';
import { getMeta } from './Meta';

export const generateRoutes = () => {
  const metas = [];
  const files = readdirSync(path.join(__dirname, '../api/controllers'));
  for (const file of files) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file.replace('.js', '');
      const Klass = require('../api/controllers/' + file);

      new Klass();
      metas.push({ controller: Klass.name, meta: getMeta(Klass.name) });
    }
  }

  console.log('[Route] Loading route with decorator');

  try {
    const result = [];

    for (const meta of metas) {
      for (const funcName of Object.keys(meta.meta.routes)) {
        const routeConfig = [];
        const config = meta.meta.routes[funcName];
        routeConfig.push(config.method.toUpperCase());

        if (config.url.length === 0) {
          routeConfig.push(path.join('/', meta.meta.url));
        } else {
          routeConfig.push(path.join('/', meta.meta.url, config.url));
        }

        routeConfig.push(config.middlewares.join(' '));
        routeConfig.push(`${meta.controller}.${funcName}`);

        console.log('Adding route: ', routeConfig.join(' '));
        result.push(routeConfig.join(' '));
      }
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
