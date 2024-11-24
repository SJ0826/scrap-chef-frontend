import axios from 'axios';

import 'react-toastify/ReactToastify.min.css';
import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setRefreshTokenFromLocalStorage,
} from '@/utils/localStorage';
import { TOAST_MESSAGE } from '@/constants/toastMessage';
import { BACKEND_BASE_API_V1, BACKEND_URL } from '@/constants/url';
import { toast } from 'react-toastify';
import { postRefreshTokenApi } from '@/services/auth';

const baseConfig = {
  baseURL: BACKEND_URL + BACKEND_BASE_API_V1,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 30000,
};

const publicAxios = axios.create(baseConfig);
const privateAxios = axios.create(baseConfig);

// 리프레시 요청 상태 변수
let isRefreshing = false;
let pendingRequests: ((newAccessToken: string) => void)[] = [];

// 토큰을 갱신하고 대기 중인 요청을 다시 시도하는 함수
const processPendingRequests = (newAccessToken: string) => {
  pendingRequests.forEach((callback) => callback(newAccessToken));
  pendingRequests = []; // 요청 리스트 초기화
};

// 요청 인터셉터
privateAxios.interceptors.request.use(
  function (config) {
    const accessToken = getAccessTokenFromLocalStorage();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
privateAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config; // 에러가 발생한 요청 정보

    if (error?.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true; // 리프레시 요청 중 표시

        try {
          const response = await postRefreshTokenApi();

          const newTokens = response.data;

          setRefreshTokenFromLocalStorage(newTokens.refreshToken);
          setAccessTokenFromLocalStorage(newTokens.accessToken);

          axios.defaults.headers.common.Authorization = `Bearer ${newTokens.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

          // 대기 중인 요청 재처리
          processPendingRequests(newTokens.accessToken);

          return await axios(originalRequest);
        } catch (refreshError) {
          console.log('리프레시 토큰 갱신 실패 in axios');
          toast.error('로그인에 실패했습니다. 다시 로그인해주세요');
          removeAccessTokenFromLocalStorage();
          removeRefreshTokenFromLocalStorage();
        } finally {
          isRefreshing = false; // 리프레시 요청 종료
        }
      }

      // 이미 리프레시 요청 중인 경우 대기
      return new Promise((resolve) => {
        pendingRequests.push((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axios(originalRequest));
        });
      });
    }

    if (error.response?.status === 403) {
      alert(TOAST_MESSAGE.ACCESS_ERROR);
    }

    if (error.response?.status >= 500) {
      toast.error(TOAST_MESSAGE.SERVER_ERROR);
    }

    if (error?.code === 'ECONNABORTED') {
      alert(TOAST_MESSAGE.TIME_ERROR);
    }

    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
