import { GenericResponse } from '@/types/common.interface';
import { privateAxios } from '@/services/axios.client';

const INGREDIENTS = 'ingredients';

// 재료 전체 조회
export const getIngredientsApi = async (): Promise<GenericResponse> => {
  const url = `/${INGREDIENTS}`;

  return (await privateAxios.get(url)).data;
};

// 재료 추가
export const postNewIngredientApi = async (ingredient: string) => {
  const url = `/${INGREDIENTS}`;
  const data = {
    title: ingredient,
  };

  return (await privateAxios.post(url, data)).data;
};

// 재료 삭제
export const removeIngredientApi = async (ingredientId: number) => {
  const url = `/${INGREDIENTS}/${ingredientId}`;

  return (await privateAxios.delete(url)).data;
};
