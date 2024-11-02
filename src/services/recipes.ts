import { ApiResponse, getData } from '@/services/apiClient';

export async function getRecipesAPI(
  ingredients: string[]
): Promise<ApiResponse<RecipesData>> {
  const query = ingredients
    .map((ingredient) => `ingredients=${encodeURIComponent(ingredient)}`)
    .join('&');

  const path = `/recipes?${query}`;

  return getData<RecipesData>(path);
}
