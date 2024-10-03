import { authenicateUser, verifyUserToken } from './auth.service'; // Adjust path as needed
import { ApiClient } from 'services/api-client'; // Mock this
import { AxiosRequestHeaders, AxiosHeaders, AxiosResponse } from 'axios';
import { AccessTokenDto, LoginUserDto, VerifyTokenDto } from '@shared/common';

jest.mock('services/api-client');

const mockLoginResponse: AxiosResponse<AccessTokenDto> = {
  data: { accessToken: 'mockAccessToken' },
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders.from({}), // Use AxiosHeaders to create the headers
  config: {
    headers: AxiosHeaders.from({}), // Create headers using AxiosHeaders
  },
};

const mockVerifyTokenResponse: AxiosResponse<VerifyTokenDto> = {
  data: {
    email: '',
    name: '',
    age: 0,
    createdAt: '',
    iat: 0,
    exp: 0,
  }, // Simulate that token verification was successful
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders.from({}), // Use AxiosHeaders to create the headers
  config: {
    headers: AxiosHeaders.from({}), // Create headers using AxiosHeaders
  },
};

const mockUserCredentials: LoginUserDto = {
  email: 'testUser',
  password: 'testPassword',
};

describe('auth.service', () => {
  describe('authenicateUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should authenticate the user and verify the token', async () => {
      // Mocking axiosInstance methods (post and get)
      (ApiClient.axiosInstance.post as jest.Mock).mockResolvedValueOnce(
        mockLoginResponse,
      );
      (ApiClient.axiosInstance.get as jest.Mock).mockResolvedValueOnce(
        mockVerifyTokenResponse,
      );
      ApiClient.setAuthorizationToken = jest.fn();

      // Call the function
      const response = await authenicateUser(mockUserCredentials);

      // Assert the correct methods were called
      expect(ApiClient.axiosInstance.post).toHaveBeenCalledWith(
        'auth',
        mockUserCredentials,
      );
      expect(ApiClient.setAuthorizationToken).toHaveBeenCalledWith(
        'mockAccessToken',
      );
      expect(ApiClient.axiosInstance.get).toHaveBeenCalledWith(
        'auth/verify-token',
      );
      expect(response).toEqual(mockLoginResponse); // Should return the login response
    });

    it('should throw an error if token verification fails', async () => {
      // Mock post and get requests
      (ApiClient.axiosInstance.post as jest.Mock).mockResolvedValueOnce(
        mockLoginResponse,
      );
      (ApiClient.axiosInstance.get as jest.Mock).mockResolvedValueOnce({
        ...mockVerifyTokenResponse,
        data: false, // Simulate failed verification
      });

      // Assert that an error is thrown
      await expect(authenicateUser(mockUserCredentials)).rejects.toThrow(
        'Cannot verify token',
      );
    });

    it('should throw an error if the login request fails', async () => {
      (ApiClient.axiosInstance.post as jest.Mock).mockRejectedValueOnce(
        new Error('Login failed'),
      );

      await expect(authenicateUser(mockUserCredentials)).rejects.toThrow(
        'Login failed',
      );
    });
  });

  describe('verifyUserToken', () => {
    const mockVerifyTokenResponse: AxiosResponse<VerifyTokenDto> = {
      data: {
        email: '',
        name: '',
        age: 0,
        createdAt: '',
        iat: 0,
        exp: 0,
      }, // Simulate successful token verification
      status: 200,
      statusText: 'OK',
      headers: AxiosHeaders.from({}), // Use AxiosHeaders to create the headers
      config: {
        headers: AxiosHeaders.from({}), // Create headers using AxiosHeaders
      },
    };

    it('should return a token verification response', async () => {
      (ApiClient.axiosInstance.get as jest.Mock).mockResolvedValueOnce(
        mockVerifyTokenResponse,
      );

      const response = await verifyUserToken();

      expect(ApiClient.axiosInstance.get).toHaveBeenCalledWith(
        'auth/verify-token',
      );
      expect(response).toEqual(mockVerifyTokenResponse);
    });

    it('should throw an error if token verification request fails', async () => {
      (ApiClient.axiosInstance.get as jest.Mock).mockRejectedValueOnce(
        new Error('Verification failed'),
      );

      await expect(verifyUserToken()).rejects.toThrow('Verification failed');
    });
  });
});
