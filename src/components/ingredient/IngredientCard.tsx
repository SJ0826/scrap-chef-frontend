'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Carrot, Plus, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getAccessTokenFromLocalStorage } from '@/utils/localStorage';
import { Ingredient } from '@/types/ingredient.interface';

interface IngredientCardProps {
  ingredients: Ingredient[];
  newIngredient: string;
  onChangeNewIngredient: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearchRecipes: (page: number) => void;
  removeIngredient: (id: number) => void;
  addIngredient: () => void;
}

export const IngredientCard = (props: IngredientCardProps) => {
  const {
    ingredients,
    newIngredient,
    onChangeNewIngredient,
    handleSearchRecipes,
    addIngredient,
    removeIngredient,
  } = props;

  /**
   * 로그인 여부를 판단합니다.
   */
  const [isSignin, setIsSignin] = useState(false);
  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    setIsSignin(!!accessToken);
  }, []);

  return (
    <Card className="mb-8 shadow-lg rounded-2xl overflow-hidden border-4">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Carrot className="mr-2" />
          냉장고 재료
        </CardTitle>
        <CardDescription>냉장고에 있는 재료를 입력하세요</CardDescription>
        <CardContent className="p-6">
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newIngredient}
              onChange={onChangeNewIngredient}
              placeholder="재료 이름"
              className="rounded-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addIngredient();
                }
              }}
            />
            <Button
              onClick={() => addIngredient()}
              className="rounded-full bg-pastel-darkorange hover:bg-pastel-darkorange/80 text-white"
            >
              <Plus size={18} />
              추가
            </Button>
          </div>
          <ul className="space-y-2">
            {ingredients?.map((ing) => (
              <li
                key={ing.id}
                className="flex justify-between items-center p-2 bg-pastel-orange/30 rounded-full"
              >
                <span className="ml-4">{ing.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIngredient(ing.id)}
                  className="rounded-full text-pastel-darkorange hover:text-pastel-darkorange/80"
                >
                  <X size={18} />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="">
          <Button
            onClick={() => handleSearchRecipes(1)}
            className="w-full rounded-full bg-white hover:bg-pastel-lightorange text-pastel-darkorange"
          >
            <Search size={18} className="mr-2" />
            레시피 검색
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
