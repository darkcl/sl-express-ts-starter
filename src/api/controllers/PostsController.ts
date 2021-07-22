import { Controller, Get, Inject, Post, Body, Params, Res, Headers } from '@/decorators';
import { PostService } from '@/api/services';
import { Response } from 'express';
import { IUser, User } from '../decorators/UserDecorator';

@Controller('posts')
class PostsController {
  @Inject() private service: PostService;

  @Get('/', ['authMiddleware'])
  async index(@Res() res: Response, @User() user: IUser) {
    return res.json({ user, post: 'a long fucking post' });
  }

  @Get('/:id', ['authMiddleware'])
  async getPost(@Params('id') id: string, @Res() res: Response) {
    return res.send(this.service.getPost(id));
  }

  @Post('/', ['authMiddleware'])
  async createPost(
    @Headers('content-type') contentType: string,
    @Body('content') content: string,
    @Res() res: Response
  ) {
    console.log('Content Type', contentType);
    console.log('Create post', content);
    return res.send({ message: 'ok' });
  }
}

module.exports = PostsController;
