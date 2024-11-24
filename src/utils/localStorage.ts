// accessToken

export const getAccessTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null; // 서버에서는 null 반환
};

export function setAccessTokenFromLocalStorage(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
}

export function removeAccessTokenFromLocalStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
}

// refreshToken

export const getRefreshTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null; // 서버에서는 null 반환
};

export function setRefreshTokenFromLocalStorage(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('refreshToken', token);
  }
}

export function removeRefreshTokenFromLocalStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('refreshToken');
  }
}
