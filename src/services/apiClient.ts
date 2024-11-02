const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: never;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export async function apiRequest<T>(
  path: string,
  { method = 'GET', headers = {}, body }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as ApiResponse<T>;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
}

// 기본 GET 요청 함수
export function getData<T>(path: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(path, { method: 'GET' });
}
