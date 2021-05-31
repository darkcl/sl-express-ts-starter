import { Request, Response } from 'express';
import { HttpMethod } from './HttpMethod';
import { getMeta, ParameterType } from './Meta';

export const Controller = (path = '') => {
  return (target: Function) => {
    const meta = getMeta(target.name);
    meta.url = path;
  };
};

const createMethodDecorator = (method: HttpMethod = 'get') => {
  return (path = '/', middlewares: string[] = []): MethodDecorator =>
    (target: object, name: string, descriptor: any) => {
      target.constructor.prototype[`__deco_${name}`] = (req: Request, res: Response) => {
        const { params } = getMeta(target.constructor.name);

        const args = params[name]
          ? params[name]
              .sort((a, b) => {
                if (a.index < b.index) {
                  return -1;
                }
                if (a.index > b.index) {
                  return 1;
                }
                return 0;
              })
              .map((v) => {
                switch (v.type) {
                  case ParameterType.REQUEST:
                    return req;
                  case ParameterType.RESPONSE:
                    return res;
                  case ParameterType.PARAMS:
                    return req.params[v.name];
                  default:
                    return null;
                }
              })
          : [];
        if (args.length === 0) {
          target[name](req, res);
        } else {
          target[name](...args);
        }
      };

      const { routes } = getMeta(target.constructor.name);

      routes[`__deco_${name}`] = {
        method,
        url: path,
        middlewares,
      };
    };
};

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
export const Patch = createMethodDecorator('patch');
