import { Injectable, Logger } from '@nestjs/common';
import { Post } from '@prisma/client';
import { error } from 'console';
import { PostDto } from './dto';
import { PrismaService } from '../../app/services/prisma/prisma.service';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(PostService.name);

  /**
   * find all posts within the database
   * @returns
   */
  async findAllPosts(): Promise<Post[]> {
    try {
      return this.prisma.post.findMany();
    } catch (e) {
      this.logger.error(e);

      throw new error('something went wrong');
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * Find post by id
   * @param postId
   * @returns Post
   */
  async findPostById(postId: number): Promise<Post> {
    try {
      return this.prisma.post.findUnique({ where: { id: postId } });
    } catch (e) {
      this.logger.error('could not find post id, something went wrong', e);

      throw new error('something went wrong', e);
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * create post
   * @param data
   * @returns
   */
  async createPost(postData: PostDto): Promise<Post> {
    try {
      return this.prisma.post.create({ data: postData });
    } catch (e) {
      this.logger.error('something went wrong with creating a post', e);
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * delete post number
   * @param postId
   */
  async deletePost(postId: number) {
    try {
      const deletePost = await this.prisma.post.delete({
        where: { id: postId },
      });
      this.logger.debug(deletePost);
    } catch (e) {
      this.logger.error('something went wrong', e);
    } finally {
      this.prisma.$disconnect();
    }
  }
}
