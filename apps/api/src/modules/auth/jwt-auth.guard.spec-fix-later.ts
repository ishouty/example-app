import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthGuard } from '@nestjs/passport';

// Mocking `canActivate` inside jest.mock
jest.mock('@nestjs/passport', () => {
  const mockCanActivate = jest.fn(); // Declare inside jest.mock
  return {
    AuthGuard: () => ({
      canActivate: mockCanActivate,
    }),
    __esModule: true,
    mockCanActivate, // Export mockCanActivate to use it in test cases
  };
});

describe.skip('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let mockExecutionContext: ExecutionContext;
  let mockCanActivate: jest.Mock;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { mockCanActivate: mock } = require('@nestjs/passport'); // Require mockCanActivate from jest.mock
    mockCanActivate = mock; // Assign it to mockCanActivate
    jwtAuthGuard = new JwtAuthGuard();
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn(),
    } as unknown as ExecutionContext;

    mockCanActivate.mockClear(); // Reset mock before each test
  });

  describe('canActivate', () => {
    it('should call super.canActivate and return its result', () => {
      // Arrange: mock the return value of canActivate
      mockCanActivate.mockReturnValue(true);

      // Act: call canActivate on jwtAuthGuard
      const result = jwtAuthGuard.canActivate(mockExecutionContext);

      // Assert: check if mockCanActivate was called
      expect(mockCanActivate).toHaveBeenCalledWith(mockExecutionContext);
      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return the user if there is no error and user is valid', () => {
      const user = { id: 1, email: 'test@example.com' };

      const result = jwtAuthGuard.handleRequest(null, user, null);

      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if there is an error', () => {
      const error = new Error('Some error');

      expect(() => jwtAuthGuard.handleRequest(error, null, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not valid', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should log the error and throw UnauthorizedException', () => {
      const error = new Error('Some error');
      const loggerErrorSpy = jest.spyOn(jwtAuthGuard['logger'], 'error');

      expect(() => jwtAuthGuard.handleRequest(error, null, null)).toThrow(
        UnauthorizedException,
      );
      expect(loggerErrorSpy).toHaveBeenCalledWith(error, 'handle request');
    });
  });
});
