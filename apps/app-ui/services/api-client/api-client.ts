import axios, { AxiosInstance } from 'axios';
import { configUi } from 'config';

// Define the API client class
export class ApiClientClass {
  public axiosInstance: AxiosInstance;

  constructor(baseURL: string, timeout = 5000) {
    // Initialize the Axios instance with custom config
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
      },
      // transformResponse: [
      //   (data) => {
      //     // Parse the response data (since it's usually in JSON)
      //     const parsedData = JSON.parse(data);
      //     // Custom transformation (example: extract only specific fields)
      //     return parsedData;
      //   },
      // ],
    });
  }

  /**
   * set auth token
   * @param token
   */
  public setAuthorizationToken(token: string) {
    try {
      this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.log('could not set bearer token', e);
    }
  }

  /**
   * Get auth token
   * @returns authToken
   */
  public getAuthorizationToken() {
    return this.axiosInstance.defaults.headers['Authorization'];
  }

  public resetAuthToken() {
    try {
      delete this.axiosInstance.defaults.headers['Authorization'];
    } catch (e) {
      console.log('could not delete token', e);
    }
  }
}

export const ApiClient = new ApiClientClass(
  `${configUi.apiBaseUrl}/api/${configUi.apiVersion}`,
  5000,
);
