import 'reflect-metadata';

import { container } from '../ioc';

export const Injectable = (token?: string) => {
  return (target: { new () }) => {
    var t = token;
    if (!t) t = target.name;
    container.providers[t] = new target();
  };
};

export const Inject = (token?: string) => {
  return (target: any, key: string) => {
    var t = token;
    if (!t) t = Reflect.getMetadata('design:type', target, key).name;
    Object.defineProperty(target, key, {
      get: () => container.resolve(t),
      enumerable: true,
      configurable: true,
    });
  };
};
