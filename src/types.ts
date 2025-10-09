export enum CeligoRegion {
  NA = 'NA',
  EU = 'EU'
}

export interface CeligoCredentials {
  token: string;
  region: CeligoRegion;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ErrorResponse {
  status: 'error';
  error: string;
  details?: {
    code: string;
    message: string;
    raw?: unknown;
    statusCode?: number;
    statusText?: string;
    apiResponse?: unknown;
  };
}

export enum CeligoErrorCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  ConnectionNotFound = 'CONNECTION_NOT_FOUND',
  InvalidConfig = 'INVALID_CONFIG',
  ApiError = 'API_ERROR',
  NetworkError = 'NETWORK_ERROR',
  UnknownError = 'UNKNOWN_ERROR'
}

// Celigo Integration types
export interface Integration {
  _id?: string;
  name: string;
  _integrationId?: string;
  offline?: boolean;
  sandbox?: boolean;
}

// Celigo Flow types
export interface Flow {
  _id?: string;
  name: string;
  _integrationId: string;
  disabled?: boolean;
}

// Celigo Connection types
export interface Connection {
  _id?: string;
  name: string;
  type: string;
  offline?: boolean;
  [key: string]: any;
}

// Token info response
export interface TokenInfo {
  _userId: string;
  scope: string;
  email?: string;
}

// Export/Import configuration
export interface ExportConfig {
  name: string;
  _connectionId: string;
  type: string;
  [key: string]: any;
}

export interface ImportConfig {
  name: string;
  _connectionId: string;
  type: string;
  [key: string]: any;
}

