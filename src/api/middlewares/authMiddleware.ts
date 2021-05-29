import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Super complex auth logic');

  return next();
};

module.exports = authMiddleware;
