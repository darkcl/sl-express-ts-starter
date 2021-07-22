import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Super complex auth logic');
  res.locals.user = {
    id: 1,
    name: 'John Doe',
  };

  return next();
};

module.exports = authMiddleware;
