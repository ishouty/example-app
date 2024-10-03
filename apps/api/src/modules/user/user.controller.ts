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
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBadRequestDto } from '../../types/common';
import { UserResponseDto } from './dtos/user-response.dto';
import { ErrorResponsePermissionDto } from '../../types/common/error-response-permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TUserWithoutPassword } from '../../types/common/user-no-password.type';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not get users',
    type: ErrorResponseBadRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get users',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Permission denied',
    type: ErrorResponsePermissionDto,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @ApiOperation({ summary: 'get all users' })
  async findAll(): Promise<TUserWithoutPassword[]> {
    return await this.userService.findAllUsers();
  }

  @ApiParam({ name: 'id', description: 'id of user' })
  @ApiOperation({ summary: 'get one user' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not get user',
    type: ErrorResponseBadRequestDto,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TUserWithoutPassword> {
    return await this.userService.getUserById(id);
  }

  @Post('create')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a user' })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Could not create user',
    type: ErrorResponseBadRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Permission denied',
    type: ErrorResponsePermissionDto,
  })
  @ApiBody({ type: CreateUserDto })
  async insertUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Successful operation',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not delete user',
    type: ErrorResponseBadRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Permission denied',
    type: ErrorResponsePermissionDto,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token - Requires to authenicate',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'delete a user' })
  @ApiParam({ name: 'id', description: 'id of user to be deleted' })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }
}
