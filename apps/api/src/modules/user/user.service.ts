import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../app/services/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { HttpStatusCode } from 'axios';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TUserWithoutPassword } from '../../types/common/user-no-password.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  private readonly Logger = new Logger(UserService.name);

  /**
   * find all users
   * @returns
   */
  async findAllUsers(): Promise<TUserWithoutPassword[]> {
    this.Logger.debug(this.configService.get<string>('JWT_SECRET'));

    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          age: true,
        },
      });
      return users;
    } catch (error) {
      this.Logger.error(error);
      throw new HttpException('error', HttpStatusCode.BadRequest);
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * get user by id
   * @param userId
   * @returns
   */
  async getUserById(userId: number): Promise<TUserWithoutPassword> {
    try {
      return this.prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          age: true,
        },
        where: { id: userId },
      });
    } catch (e) {
      this.Logger.error(e);
      throw new HttpException('error', HttpStatusCode.BadRequest);
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * create a user
   * @param data
   * @returns
   */
  async createUser(data: CreateUserDto): Promise<User | null> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

      const createdUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      delete createdUser.password;
      return createdUser;
    } catch (error) {
      Logger.error(error);
      Logger.log('create error');
      throw new HttpException(
        'Sorry, cannot create user',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      this.prisma.$disconnect();
    }
  }

  /**
   * delete user by id
   * @param userId
   */
  async deleteUserById(userId: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
      this.Logger.log(e);
    } finally {
      this.prisma.$disconnect();
    }
  }
}
