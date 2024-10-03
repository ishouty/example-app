import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
//import { Post as PostPrisma } from '@prisma/client';
import { ErrorResponseBadRequestDto } from '../../types/common';
import { PostResponseDto } from './dto/post-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(private readonly PostService: PostService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [PostResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Could not create user',
    type: ErrorResponseBadRequestDto,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  async getAllPosts() {
    return this.PostService.findAllPosts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @ApiOperation({ summary: 'get post by id' })
  @ApiParam({ name: 'id', description: 'the id the post' })
  async getPostById(@Param('id', ParseIntPipe) postId: number) {
    return this.PostService.findPostById(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a post' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful operation',
    type: [PostResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Could not create post',
    type: ErrorResponseBadRequestDto,
  })
  @ApiBody({ type: CreatePostDto })
  async createPost(@Body() data: PostDto) {
    return this.PostService.createPost(data);
  }

  @Delete()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successful operation',
  })
  @ApiResponse({
    status: 400,
    description: 'Could not delete post',
    type: ErrorResponseBadRequestDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a post' })
  @ApiParam({ name: 'id', description: 'post id to delete' })
  async deletePost(@Param('id', ParseIntPipe) postId: number) {
    return this.PostService.deletePost(postId);
  }
}
