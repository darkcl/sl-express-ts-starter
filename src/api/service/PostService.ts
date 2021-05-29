import { Injectable } from '../../decorators';

@Injectable()
export class PostService {
  public getPosts() {
    return 'A lot of post';
  }
}
