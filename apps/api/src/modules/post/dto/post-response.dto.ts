import { ApiProperty } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class PostResponseDto extends PostDto {
  @ApiProperty({ example: 1 })
  id: number;
}
