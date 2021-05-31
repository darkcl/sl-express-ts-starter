/**
 * All possible parameter decorator types
 *
 * @export
 * @enum {number}
 */
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

/**
 * Cached(meta) parameter configuration
 *
 * @export
 * @interface ParameterConfiguration
 */
export interface ParameterConfiguration {
  index: number;
  type: ParameterType;
  name?: string;
  data?: any;
}

/**
 * Cached(meta) route configuration
 *
 * @export
 * @interface Route
 */
export interface Route {
  method: string;
  url: string;
  middlewares: string[];
}

/**
 * Express decorators controller metadata
 *
 * @export
 * @interface ExpressMeta
 */
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

/**
 * Express decorators controller
 *
 * @export
 * @interface ExpressMeta
 */
export interface ExpressClass {
  __express_meta__?: ExpressMeta;
}

const expressMeta = {};

/**
 * Get or initiate metadata on a target
 *
 * @param {ExpressClass} target
 * @returns {ExpressMeta}
 */
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
