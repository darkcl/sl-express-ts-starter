import { Request, Response } from 'express';
import { Controller, Get } from '../../decorators';

@Controller('posts')
class PostsController {
  @Get('/')
  async index(req: Request, res: Response) {
    return res.send('Hello posts!!!');
  }
}

module.exports = PostsController;
