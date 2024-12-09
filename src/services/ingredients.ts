import { GenericResponse } from '@/types/common.interface';
import { privateAxios } from '@/services/axios.client';

const INGREDIENTS = '/ingredient';

// 재료 전체 조회
export const getIngredientsApi = async (): Promise<GenericResponse> => {
  const url = `${INGREDIENTS}`;
  return (await privateAxios.get(url)).data;
};
