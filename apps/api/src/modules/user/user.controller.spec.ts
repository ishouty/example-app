import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';

// Mock JwtAuthGuard
const mockJwtAuthGuard = jest.fn(() => true);

// Mock user data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  name: 'John Doe',
  password: 'password123',
  createdAt: new Date(),
  updatedAt: new Date(),
  age: 3,
};

// Mock UserService
const mockUserService = {
  findAllUsers: jest.fn().mockResolvedValue([mockUser]),
  getUserById: jest.fn().mockResolvedValue(mockUser),
  createUser: jest.fn().mockResolvedValue(mockUser),
  deleteUserById: jest.fn().mockResolvedValue(undefined),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // Inject mock UserService
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard) // Mock JwtAuthGuard
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockUser]);
      expect(service.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a single user by ID', async () => {
      const result = await controller.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(service.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('insertUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'password123',
      };
      const result = await controller.insertUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const result = await controller.deleteUserById(1);
      expect(result).toBeUndefined();
      expect(service.deleteUserById).toHaveBeenCalledWith(1);
    });
  });
});
