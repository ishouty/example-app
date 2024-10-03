import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mockJwtSecret'), // Mock the JWT_SECRET
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return user payload when validated', async () => {
      const mockPayload = { id: 1, email: 'test@test.com' };
      const result = await jwtStrategy.validate(mockPayload);

      expect(result).toEqual({
        userId: mockPayload.id,
        email: mockPayload.email,
      });
    });

    it('should throw UnauthorizedException if payload is invalid', async () => {
      const mockPayload = { id: null, email: '' };

      await expect(jwtStrategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('constructor', () => {
    it('should configure strategy options with correct values', () => {
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
    });
  });
});
