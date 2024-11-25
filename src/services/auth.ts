import { publicAxios } from '@/services/axios.client';
import { AuthDto } from '@/types/auth.interface';
import { GenericResponse } from '@/types/common.interface';

const AUTH = '/auth';

// 회원가입
export const postSignupApi = async (
  data: AuthDto
): Promise<GenericResponse> => {
  const url = `${AUTH}/signup`;
  return (await publicAxios.post(url, data)).data;
};

// 로그인
export const postSigninApi = async (data: AuthDto) => {
  const url = `${AUTH}/signin`;
  return (await publicAxios.post(url, data)).data;
};

// 토큰 갱신
export const postRefreshTokenApi = async () => {
  const url = `${AUTH}/token/refresh`;
  return (await publicAxios.post(url)).data;
};
