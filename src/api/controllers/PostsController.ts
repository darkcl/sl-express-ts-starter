import { Request, Response } from 'express';
import { Controller, Get, Inject } from '../../decorators';
import { PostService } from '../service/PostService';

@Controller('posts')
class PostsController {
  @Inject() private service: PostService;

  @Get('/', ['authMiddleware'])
  async index(req: Request, res: Response) {
    return res.send(this.service.getPosts());
  }
}

module.exports = PostsController;
