import { NextFunction, Request, Response } from 'express';
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
      target.constructor.prototype[`__deco_${name}`] = (req: Request, res: Response, next: NextFunction) => {
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
                    return v.name ? req.params : req.params[v.name];
                  case ParameterType.BODY:
                    return v.name ? req.body[v.name] : req.body;
                  case ParameterType.HEADERS:
                    return v.name ? req.headers[v.name] : req.headers;
                  case ParameterType.QUERY:
                    return v.name ? req.query[v.name] : req.query;
                  case ParameterType.COOKIES:
                    return v.name ? req.cookies[v.name] : req.cookies;
                  case ParameterType.NEXT:
                    return next;
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
