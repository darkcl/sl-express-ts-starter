import { Controller, Get, Inject } from '@/decorators';
import { PostService } from '@/api/services';
import { Params, Req, Res } from '@/decorators/ParamsDecorators';
import { Response } from 'express';

@Controller('posts')
class PostsController {
  @Inject() private service: PostService;

  @Get('/', ['authMiddleware'])
  async index(@Res() res: Response) {
    return res.send(this.service.getPosts());
  }

  @Get('/:id', ['authMiddleware'])
  async getPost(@Params('id') id: string, @Res() res: Response) {
    return res.send(this.service.getPost(id));
  }
}

module.exports = PostsController;
