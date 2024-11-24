import { publicAxios } from '@/services/axios.client';
import { SignupDto } from '@/types/auth.interface';
import { GenericResponse } from '@/types/common.interface';

const AUTH = '/auth';

export const postSignupApi = async (
  data: SignupDto
): Promise<GenericResponse> => {
  const url = `${AUTH}/signup`;
  return (await publicAxios.post(url, data)).data;
};

export const postRefreshTokenApi = async () => {
  const url = `${AUTH}/token/refresh`;
  return (await publicAxios.post(url)).data;
};
