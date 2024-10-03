import { AxiosResponse } from 'axios';
import {
  getListUsers,
  getUserById,
  createNewUser,
  deleteUser,
} from './user.service'; // Update with the actual path
import {
  CreateUserDto,
  helloTypes,
  type UserResponseDto,
} from '@shared/common';

let mockResponse: unknown;

jest.mock('axios', () => {
  return {
    create: () => ({
      get: jest.fn(
        () =>
          new Promise((resolve, reject) => {
            resolve({
              status: 200,
              data: mockResponse,
            });
          }),
      ),
      post: jest.fn(
        () =>
          new Promise((resolve, reject) => {
            resolve({
              status: 201,
              data: mockResponse,
            });
          }),
      ),
      put: jest.fn(),
      delete: jest.fn(
        () =>
          new Promise((resolve, reject) => {
            resolve({
              status: 201,
            });
          }),
      ),
    }),
  };
});

describe('User Service API', () => {
  it('should fetch the list of users', async () => {
    mockResponse = [
      {
        id: 2,
        name: 'John Doe',
        email: '',
        age: 0,
        createdAt: '',
      },
      {
        id: 3,
        name: 'Jane Doe',
        email: '',
        age: 0,
        createdAt: '',
      },
    ];

    // Mock the GET request for the users
    const response = await getListUsers();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockResponse);
  });

  it('should fetch a user by ID', async () => {
    const userId = '1';
    mockResponse = {
      id: 2,
      name: 'John Doe',
      email: 'test@hello.com',
      age: 0,
      createdAt: '23232332',
    };

    // Mock the GET request for a specific user
    const response = await getUserById(userId);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockResponse);
  });

  it('should create a new user', async () => {
    const newUser: CreateUserDto = {
      name: 'New User',
      email: 'user@test.com',
      age: 0,
      password: '',
    };
    mockResponse = { id: '3', name: newUser.name };

    const response = await createNewUser(newUser);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(mockResponse);
  });

  it('should delete a user by ID', async () => {
    const userId = '1';
    mockResponse = {};
    const response = await deleteUser(userId);

    expect(response.status).toBe(201);
  });
});
