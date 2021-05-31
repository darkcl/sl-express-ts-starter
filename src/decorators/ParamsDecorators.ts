import { ExpressMeta, getMeta } from './Meta';

enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  NEXT,
}

function decoratorFactory(type: ParameterType) {
  return function (name?: string): ParameterDecorator {
    return function (target: any, methodName: string, index: number) {
      const meta: ExpressMeta = getMeta(target.constructor.name);

      if (meta.params[methodName] === undefined) {
        meta.params[methodName] = [];
      }

      meta.params[methodName].push({ index, type, name });
    };
  };
}

export const Req = decoratorFactory(ParameterType.REQUEST);

export const Res = decoratorFactory(ParameterType.RESPONSE);

export const Next = decoratorFactory(ParameterType.NEXT);

export const Params = decoratorFactory(ParameterType.PARAMS);

export const Query = decoratorFactory(ParameterType.QUERY);

export const Body = decoratorFactory(ParameterType.BODY);

export const Headers = decoratorFactory(ParameterType.HEADERS);

export const Cookies = decoratorFactory(ParameterType.COOKIES);
