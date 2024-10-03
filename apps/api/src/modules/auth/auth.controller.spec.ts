import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { AccessTokenDto } from './dtos/access-token.dto';
//import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            validateUserToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token when credentials are valid', async () => {
      const mockCredentials: LoginUserDto = {
        email: 'test@ishouty.com',
        password: 'password',
      };
      const mockAccessToken: AccessTokenDto = { accessToken: 'mockToken' };

      jest.spyOn(authService, 'login').mockResolvedValue(mockAccessToken);

      const result = await authController.login(mockCredentials);
      expect(authService.login).toHaveBeenCalledWith(mockCredentials);
      expect(result).toEqual(mockAccessToken);
    });
  });

  describe('verifyToken', () => {
    it('should validate the token and return the user', async () => {
      const mockAuthHeader = 'Bearer validToken';
      // const mockUser = { id: 1, email: 'test@ishouty.com' };

      // todo fix later
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockAccessToken: any = { accessToken: 'mockToken' };

      jest
        .spyOn(authService, 'validateUserToken')
        .mockResolvedValue(mockAccessToken);

      const result = await authController.verifyToken(mockAuthHeader);
      expect(authService.validateUserToken).toHaveBeenCalledWith(
        mockAuthHeader,
      );
      expect(result).toEqual(mockAccessToken);
    });

    it('should throw an error if the authorization header is missing', async () => {
      await expect(authController.verifyToken('')).rejects.toThrowError(
        'Authorization header is missing',
      );
    });
  });
});
