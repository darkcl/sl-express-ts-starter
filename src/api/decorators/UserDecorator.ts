import { createParamsDecorator } from '@/decorators';

export type IUser = {
  id: number;
  name: string;
};

export const User = createParamsDecorator((ctx) => {
  return ctx.res.locals.user;
}, 'USER');
