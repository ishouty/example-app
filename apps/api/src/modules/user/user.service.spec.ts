import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../app/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

jest.mock('bcrypt'); // Mock the bcrypt module

// Mock User data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  name: 'John Doe',
  password: 'hashed_password',
  createdAt: new Date(),
  updatedAt: new Date(),
  age: 3,
};

// Mock PrismaService
const mockPrismaService = {
  user: {
    findMany: jest.fn().mockResolvedValue([mockUser]),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(undefined),
  },
  $disconnect: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        ConfigService, // Use real or mocked ConfigService if necessary
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.findAllUsers();
      expect(result).toEqual([mockUser]);
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(prisma.$disconnect).toHaveBeenCalled();
    });

    it('should throw an error if findMany fails', async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      await expect(service.findAllUsers()).rejects.toThrow(HttpException);
      expect(prisma.$disconnect).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const result = await service.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: {
          age: true,
          createdAt: true,
          email: true,
          id: true,
          name: true,
          updatedAt: true,
        },
        where: { id: 1 },
      });
    });

    it('should throw an error if findUnique fails', async () => {
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      await expect(service.getUserById(1)).rejects.toThrow(Error);
    });
  });

  describe('createUser', () => {
    it('should create a new user and hash the password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'password123',
      };

      const bcryptHashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashed_password');
      const result = await service.createUser(createUserDto);

      expect(bcryptHashSpy).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'hashed_password',
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if create fails', async () => {
      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const createUserDto: CreateUserDto = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'password123',
      };

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const result = await service.deleteUserById(1);
      expect(result).toBeUndefined();
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if delete fails', async () => {
      (prisma.user.delete as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      await expect(service.deleteUserById(1)).rejects.toThrow(HttpException);
    });
  });
});
