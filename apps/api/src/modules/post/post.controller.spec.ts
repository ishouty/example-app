import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { HttpStatus } from '@nestjs/common';
// import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
// import { Post } from '@prisma/client';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            findAllPosts: jest.fn(),
            findPostById: jest.fn(),
            createPost: jest.fn(),
            deletePost: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // Mock JWT Guard
      .compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result = [
        {
          id: 1,
          title: 'Test Post',
          content: 'Test content',
          authorId: 0,
          published: true,
        },
      ];
      jest.spyOn(service, 'findAllPosts').mockResolvedValue(result);

      expect(await controller.getAllPosts()).toBe(result);
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      const result = {
        id: 1,
        title: 'Test Post',
        content: 'Test content',
        authorId: 0,
        published: true,
      };

      jest.spyOn(service, 'findPostById').mockResolvedValue(result);

      expect(await controller.getPostById(1)).toBe(result);
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        content: 'New content',
        published: false,
        authorId: 0,
      };
      const result = { id: 1, ...createPostDto };
      jest.spyOn(service, 'createPost').mockResolvedValue(result);

      expect(await controller.createPost(createPostDto)).toBe(result);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 1;
      const deletPostSpy = jest.spyOn(service, 'deletePost');

      await controller.deletePost(postId);
      expect(deletPostSpy).toHaveBeenCalled();
      expect(deletPostSpy).toHaveBeenCalledWith(postId);
    });
  });
});
