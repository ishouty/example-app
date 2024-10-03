import {
  CreateUserDto,
  helloTypes,
  type UserResponseDto,
} from '@shared/common';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ApiClient } from 'services/api-client';

/**
 *
 * @returns
 */
export const getListUsers = (): Promise<AxiosResponse<UserResponseDto[]>> => {
  return ApiClient.axiosInstance.get('users', {}).then((response) => response);
};

/**
 *
 * @param userId
 * @returns
 */
export const getUserById = (
  userId: string,
): Promise<AxiosResponse<UserResponseDto>> => {
  return ApiClient.axiosInstance
    .get(`users/${userId}`)
    .then((response) => response);
};

/**
 *
 * @param user
 * @returns
 */
export const createNewUser = async (
  user: CreateUserDto,
): Promise<AxiosResponse<UserResponseDto>> => {
  return ApiClient.axiosInstance
    .post<
      AxiosResponse<UserResponseDto>,
      AxiosResponse<UserResponseDto, CreateUserDto>
    >('users/create', user)
    .then((response) => {
      return response;
    });
};

/**
 *
 * @param userId
 * @returns
 */
export const deleteUser = (userId: string) => {
  return ApiClient.axiosInstance
    .delete<UserResponseDto>('user', { params: { id: userId } })
    .then((response) => response);
};
