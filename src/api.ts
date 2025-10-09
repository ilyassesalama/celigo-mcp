import axios, { AxiosError } from 'axios';
import { ApiResponse, CeligoErrorCode, CeligoRegion, ErrorResponse } from './types.js';

export const CELIGO_API_BASES = {
  [CeligoRegion.NA]: 'https://api.integrator.io/v1',
  [CeligoRegion.EU]: 'https://api.eu.integrator.io/v1'
};

export const createHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

interface CeligoErrorData {
  message?: string;
  code?: string;
  details?: unknown;
  [key: string]: unknown;
}

function formatErrorDetails(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error, null, 2);
    } catch {
      return Object.prototype.toString.call(error);
    }
  }
  return String(error);
}

export async function makeRequest<T, D = Record<string, unknown>>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  token: string,
  region: CeligoRegion,
  data?: D
): Promise<ApiResponse<T>> {
  try {
    const apiBase = CELIGO_API_BASES[region];
    
    const response = await axios({
      method,
      url: `${apiBase}${endpoint}`,
      headers: createHeaders(token),
      data
    });

    return {
      data: response.data,
      status: response.status
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<CeligoErrorData>;
      const errorData = axiosError.response?.data;

      if (axiosError.response?.status === 401) {
        throw createErrorResponse(
          CeligoErrorCode.InvalidCredentials,
          'Invalid or expired token. Please check your Celigo credentials.'
        );
      }

      if (axiosError.response?.status === 404) {
        throw createErrorResponse(
          CeligoErrorCode.ConnectionNotFound,
          'Resource not found. Please verify the requested resource exists.'
        );
      }

      if (axiosError.response?.status === 400) {
        throw createErrorResponse(
          CeligoErrorCode.InvalidConfig,
          `Invalid request: ${formatErrorDetails(errorData)}`,
          errorData
        );
      }

      throw createErrorResponse(
        CeligoErrorCode.ApiError,
        `API Error (${axiosError.response?.status}): ${formatErrorDetails(errorData)}`,
        errorData
      );
    }

    if (error instanceof Error && error.message.includes('Network')) {
      throw createErrorResponse(
        CeligoErrorCode.NetworkError,
        'Network error occurred. Please check your internet connection.'
      );
    }

    throw createErrorResponse(
      CeligoErrorCode.UnknownError,
      `Unexpected error: ${formatErrorDetails(error)}`
    );
  }
}

export function createErrorResponse(
  code: CeligoErrorCode,
  message: string,
  rawError?: unknown
): ErrorResponse {
  const errorResponse: ErrorResponse = {
    status: 'error',
    error: message,
    details: {
      code,
      message,
      raw: rawError
    }
  };
  
  if (rawError && typeof rawError === 'object' && 'isAxiosError' in rawError && rawError.isAxiosError) {
    if ('response' in rawError && 
        rawError.response && 
        typeof rawError.response === 'object' && 
        errorResponse.details) {
      
      const response = rawError.response;
      
      if ('status' in response) {
        errorResponse.details.statusCode = response.status as number;
      }
      
      if ('statusText' in response) {
        errorResponse.details.statusText = response.statusText as string;
      }
      
      if ('data' in response) {
        errorResponse.details.apiResponse = response.data;
      }
    }
  }
  
  return errorResponse;
}

export const api = {
  async get<T>(endpoint: string, token: string, region: CeligoRegion): Promise<ApiResponse<T>> {
    return makeRequest<T>('get', endpoint, token, region);
  },

  async post<T, D = Record<string, unknown>>(
    endpoint: string, 
    token: string, 
    region: CeligoRegion,
    data: D
  ): Promise<ApiResponse<T>> {
    return makeRequest<T, D>('post', endpoint, token, region, data);
  },

  async put<T, D = Record<string, unknown>>(
    endpoint: string, 
    token: string, 
    region: CeligoRegion,
    data: D
  ): Promise<ApiResponse<T>> {
    return makeRequest<T, D>('put', endpoint, token, region, data);
  },

  async delete<T>(endpoint: string, token: string, region: CeligoRegion): Promise<ApiResponse<T>> {
    return makeRequest<T>('delete', endpoint, token, region);
  },
  
  async validateToken(token: string, region: CeligoRegion): Promise<boolean> {
    try {
      const response = await this.get<{ _userId: string; scope: string }>('/tokenInfo', token, region);
      return response.status === 200 && !!response.data._userId;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }
};

/**
 * Filter out large data fields that consume unnecessary tokens
 */
export function filterCeligoResponse(response: any): any {
  if (!response || typeof response !== 'object') {
    return response;
  }

  if (Array.isArray(response)) {
    return response.map(item => filterCeligoResponse(item));
  }

  const { mockOutput, sampleData, aiDescription, ...filteredResponse } = response;
  
  const result: any = {};
  for (const [key, value] of Object.entries(filteredResponse)) {
    if (value && typeof value === 'object') {
      result[key] = filterCeligoResponse(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

