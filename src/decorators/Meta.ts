export enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  NEXT,
}

export interface ParameterConfiguration {
  index: number;
  type: ParameterType;
  name?: string;
  data?: any;
}

export interface Route {
  method: string;
  url: string;
  middlewares: string[];
}
export interface ExpressMeta {
  url: string;

  routes: {
    [key: string]: Route;
  };

  middleware: string[];

  params: {
    [key: string]: ParameterConfiguration[];
  };
}

export interface ExpressClass {
  __express_meta__?: ExpressMeta;
}

const expressMeta = {};

export function getMeta(target: string): ExpressMeta {
  if (!expressMeta[target]) {
    expressMeta[target] = {
      url: '',
      middleware: [],
      routes: {},
      params: {},
    };
  }
  return expressMeta[target];
}
