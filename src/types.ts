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

// Flow configuration types
export interface PageGenerator {
  _exportId: string;
  skipRetries?: boolean;
}

export interface ExportResponseMapping {
  fields: Array<{
    extract: string;
    generate: string;
  }>;
  lists: Array<{
    extract: string;
    generate: string;
  }>;
}

export interface ImportResponseMapping {
  fields: Array<{
    extract: 'id' | 'statusCode';
    generate: string;
  }>;
  lists: Array<{
    extract: string;
    generate: string;
  }>;
}

export interface Hook {
  function: string;
  _scriptId: string;
}

export interface ExportProcessor {
  type: 'export';
  _exportId: string;
  proceedOnFailure?: boolean;
  responseMapping: ExportResponseMapping;
  hooks?: {
    postResponseMap: Hook;
  };
}

export interface ImportProcessor {
  type: 'import';
  _importId: string;
  proceedOnFailure?: boolean;
  responseMapping?: ImportResponseMapping;
}

export type PageProcessor = ExportProcessor | ImportProcessor;

export interface FlowConfig {
  name: string;
  _integrationId: string;
  _flowGroupingId?: string;
  pageGenerators: PageGenerator[];
  pageProcessors: PageProcessor[];
  free?: boolean;
  disabled?: boolean;
  sandbox?: boolean;
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

// Script types
export interface Script {
  _id?: string;
  name: string;
  content?: string;
  sandbox?: boolean;
  description?: string;
  [key: string]: any;
}

// Tag types
export interface Tag {
  _id?: string;
  tag: string;
  [key: string]: any;
}

// User/Share types
export interface UserShare {
  _id?: string;
  email?: string;
  accessLevel?: string;
  [key: string]: any;
}

// iClient types
export interface IClient {
  _id?: string;
  name?: string;
  provider: string;
  [key: string]: any;
}

// File Definition types
export interface FileDefinition {
  _id?: string;
  name: string;
  format: string;
  [key: string]: any;
}

// Job types
export interface Job {
  _id?: string;
  type?: string;
  status?: string;
  _flowId?: string;
  [key: string]: any;
}

// License types
export interface License {
  _id?: string;
  [key: string]: any;
}
