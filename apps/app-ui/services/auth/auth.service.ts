import { AccessTokenDto, LoginUserDto, VerifyTokenDto } from '@shared/common';
import { AxiosResponse } from 'axios';
import { ApiClient } from 'services/api-client';

/**
 * authenicate user
 * @param userCredentials
 * @returns
 */
export const authenicateUser = async (userCredentials: LoginUserDto) => {
  const autenicateUserCreds = await ApiClient.axiosInstance
    .post<LoginUserDto, AxiosResponse<AccessTokenDto>>('auth', userCredentials)
    .then((response) => {
      //console.log(response.data.accessToken, 'show me token');
      ApiClient.setAuthorizationToken(response.data.accessToken);
      return response;
    })

    .then(async (response) => {
      const verifyToken = await verifyUserToken();

      if (!verifyToken.data) {
        throw new Error('Cannot verify token');
      }

      return response;
      // update dispatch of user details to state for session handling
    });

  return autenicateUserCreds;
};

/**
 * verify user token
 * @returns
 */
export const verifyUserToken = async (): Promise<
  AxiosResponse<VerifyTokenDto>
> => {
  const verifyTokenResponse =
    await ApiClient.axiosInstance.get('auth/verify-token');
  return verifyTokenResponse;
};
