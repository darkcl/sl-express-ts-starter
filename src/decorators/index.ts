import { HttpMethod } from './HttpMethod';

export const routeList = [];

export const controllerTable = {};

export function Controller(path = ''): ClassDecorator {
  return (target: Function) => {
    controllerTable[target.name] = { basePath: path };
  };
}

export function createMethodDecorator(method: HttpMethod = 'get') {
  return (path = '/'): MethodDecorator =>
    (target: object, name: string, descriptor: any) => {
      routeList.push({
        type: method,
        target: target.constructor.name,
        name,
        path,
      });
    };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
