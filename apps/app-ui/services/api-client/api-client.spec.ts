import axios from 'axios';
import { ApiClientClass } from './api-client';

const configUi = {
  apiBaseUrl: 'http://localhost',
  apiVersion: 'v1',
  environment: 'test',
};

const apiBaseUrl = `${configUi.apiBaseUrl}/api/${configUi.apiVersion}`;

describe('ApiClientClass', () => {
  it('should initialize axios with correct baseURL and timeout', () => {
    const axiosSpyOn = jest.spyOn(axios, 'create');
    new ApiClientClass(apiBaseUrl, 5000);

    expect(axiosSpyOn).toHaveBeenCalledWith({
      baseURL: apiBaseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should set bearer token', () => {
    const apiClient = new ApiClientClass(apiBaseUrl, 5000);

    apiClient.setAuthorizationToken('hello-settoken');

    expect(apiClient.getAuthorizationToken()).toEqual('Bearer hello-settoken');
  });

  it('should delete bearer token', () => {
    const apiClient = new ApiClientClass(apiBaseUrl, 5000);
    apiClient.setAuthorizationToken('hello-settoken');

    apiClient.resetAuthToken();

    expect(apiClient.getAuthorizationToken()).toEqual(undefined);
  });
});
