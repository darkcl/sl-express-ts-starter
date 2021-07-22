import { ExpressMeta, getMeta } from './Meta';
import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';

type ParameterType = 'REQUEST' | 'RESPONSE' | 'PARAMS' | 'QUERY' | 'BODY' | 'HEADERS' | 'COOKIES' | 'NEXT';

export type ExpressContext = {
  req: Request;
  res: Response;
  next: NextFunction;
};

export type ParamsHandler = (ctx: ExpressContext, name: string) => any;

const paramsDecoratorHandler = {};

export const getDecoratorHandler = (type: string) => {
  return paramsDecoratorHandler[type];
};

export function createParamsDecorator(handler: ParamsHandler, type?: string) {
  return function (name?: string): ParameterDecorator {
    return function (target: any, methodName: string, index: number) {
      const meta: ExpressMeta = getMeta(target.constructor.name);

      if (meta.params[methodName] === undefined) {
        meta.params[methodName] = [];
      }

      const typeId = type || uuid().toString();

      paramsDecoratorHandler[typeId] = handler;

      meta.params[methodName].push({ index, type: type || uuid(), name });
    };
  };
}

export const Req = createParamsDecorator((ctx, name) => {
  return name ? ctx.req[name] : ctx.req;
}, 'REQUEST');

export const Res = createParamsDecorator((ctx, name) => {
  return name ? ctx.res[name] : ctx.res;
}, 'RESPONSE');

export const Next = createParamsDecorator((ctx, name) => {
  return ctx.next;
}, 'NEXT');

export const Params = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.params[name] : ctx.req.params;
}, 'PARAMS');

export const Query = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.query[name] : ctx.req.query;
}, 'QUERY');

export const Body = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.body[name] : ctx.req.body;
}, 'BODY');

export const Headers = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.headers[name] : ctx.req.headers;
}, 'HEADERS');

export const Cookies = createParamsDecorator((ctx, name) => {
  return name ? ctx.req.cookies[name] : ctx.req.cookies;
}, 'COOKIES');
