import { HttpMethod } from './HttpMethod';

export const routeList = [];

export const controllerTable = {};

export const Controller = (path = '') => {
  return (target: Function) => {
    controllerTable[target.name] = { basePath: path };
  };
};

const createMethodDecorator = (method: HttpMethod = 'get') => {
  return (path = '/', middlewares: string[] = []): MethodDecorator =>
    (target: object, name: string, descriptor: any) => {
      routeList.push({
        type: method,
        target: target.constructor.name,
        name,
        path,
        middlewares,
      });
    };
};

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
export const Patch = createMethodDecorator('patch');
