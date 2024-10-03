import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../app/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
//import * as bcrypt from 'bcrypt';
//import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUserDto } from './dtos/login-user.dto';
import { ForbiddenException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
            $disconnect: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      const mockUser: LoginUserDto = {
        email: 'test@test.com',
        password: 'password123',
      };
      const mockValidateUser: User = {
        id: 1,
        email: 'test@test.com',
        name: 'asdasd',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'kjhjhkjhjkh',
        age: 3,
      };

      jest
        .spyOn(authService, 'validateUserCred')
        .mockResolvedValue(mockValidateUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockAccessToken');
      jest.spyOn(configService, 'get').mockReturnValue('3600');

      const result = await authService.login(mockUser);

      expect(result.accessToken).toEqual('mockAccessToken');
      expect(jwtService.sign).toHaveBeenCalledWith(mockValidateUser, {
        expiresIn: '3600',
      });
    });

    it('should throw ForbiddenException if access token generation fails', async () => {
      const mockUser = { email: 'test@test.com', password: 'password123' };
      const mockValidateUser: User = {
        id: 1,
        email: 'test@test.com',
        name: 'asdasd',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'kjhjhkjhjkh',
        age: 3,
      };

      jest
        .spyOn(authService, 'validateUserCred')
        .mockResolvedValue(mockValidateUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('');

      await expect(authService.login(mockUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  //   describe('validateUserCred', () => {
  //     it('should return a user if credentials are valid', async () => {
  //       const mockUser = { email: 'test@test.com', password: 'password123' };
  //       const mockFoundUser = {
  //         id: 1,
  //         email: 'test@test.com',
  //         password: 'hashedPassword',
  //       };

  //       jest
  //         .spyOn(prismaService.user, 'findUnique')
  //         .mockResolvedValue(mockFoundUser);
  //       jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

  //       const result = await authService.validateUserCred(mockUser);

  //       expect(result).toEqual({ id: 1, email: 'test@test.com' });
  //       expect(prismaService.user.findUnique).toHaveBeenCalledWith({
  //         where: { email: 'test@test.com' },
  //       });
  //     });

  //     it('should throw UnauthorizedException if user not found', async () => {
  //       const mockUser = { email: 'test@test.com', password: 'password123' };

  //       jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

  //       await expect(authService.validateUserCred(mockUser)).rejects.toThrow(
  //         UnauthorizedException,
  //       );
  //     });

  //     it('should throw UnauthorizedException if password is invalid', async () => {
  //       const mockUser = { email: 'test@test.com', password: 'password123' };
  //       const mockFoundUser = {
  //         id: 1,
  //         email: 'test@test.com',
  //         password: 'hashedPassword',
  //       };

  //       jest
  //         .spyOn(prismaService.user, 'findUnique')
  //         .mockResolvedValue(mockFoundUser);
  //       jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

  //       await expect(authService.validateUserCred(mockUser)).rejects.toThrow(
  //         UnauthorizedException,
  //       );
  //     });
  //   });

  //   describe('validateUserToken', () => {
  //     it('should return the decoded token if it is valid', async () => {
  //       const mockToken = 'Bearer mockToken';
  //       const mockDecoded = { userId: 1 };

  //       jest.spyOn(jwtService, 'verify').mockReturnValue(mockDecoded);

  //       const result = await authService.validateUserToken(mockToken);

  //       expect(result).toEqual(mockDecoded);
  //       expect(jwtService.verify).toHaveBeenCalledWith('mockToken');
  //     });

  //     it('should throw UnauthorizedException if token is invalid', async () => {
  //       const mockToken = 'Bearer invalidToken';

  //       jest.spyOn(jwtService, 'verify').mockImplementation(() => {
  //         throw new Error('Invalid token');
  //       });

  //       await expect(authService.validateUserToken(mockToken)).rejects.toThrow(
  //         UnauthorizedException,
  //       );
  //     });
  //   });
});
