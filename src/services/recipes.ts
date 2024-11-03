import { ApiResponse, getData } from '@/services/apiClient';

export async function getRecipesAPI(
  ingredients: string[],
  page: number
): Promise<ApiResponse<RecipesData>> {
  const query = ingredients
    .map((ingredient) => `ingredients=${encodeURIComponent(ingredient)}`)
    .join('&');
  console.log(page);
  const path = `/recipes?${query}&page=${page}`;

  return getData<RecipesData>(path);
}
