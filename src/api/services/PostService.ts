import { Injectable } from '@/decorators';

@Injectable()
export class PostService {
  public getPost(id: string) {
    return `Get Post: ${id}`;
  }
  public getPosts() {
    return 'A lot of post';
  }
}
