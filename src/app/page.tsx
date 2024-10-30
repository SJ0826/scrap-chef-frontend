'use client';

import Image from 'next/image';
import { Refrigerator, Carrot, Plus, X, ChefHat, Search } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Ingredient = {
  id: number;
  name: string;
};

type CookingStep = {
  instruction: string;
  imageUrl: string;
};

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  cookingSteps: CookingStep[];
  imageUrl: string;
};

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, { id: Date.now(), name: newIngredient }]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const searchRecipes = () => {
    const dummyRecipes: Recipe[] = [
      {
        id: 1,
        name: '김치찌개',
        ingredients: ['김치', '돼지고기', '두부'],
        cookingSteps: [
          {
            instruction: '김치를 적당한 크기로 썬다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
          {
            instruction: '돼지고기를 볶는다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
          {
            instruction: '물을 붓고 김치를 넣어 끓인다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
          {
            instruction: '두부를 넣고 더 끓인다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
        ],
        imageUrl: '/placeholder.svg?height=200&width=200',
      },
      {
        id: 2,
        name: '된장찌개',
        ingredients: ['된장', '두부', '애호박'],
        cookingSteps: [
          {
            instruction: '물을 끓인다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
          {
            instruction: '된장을 풀어 넣는다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
          {
            instruction: '채소와 두부를 넣고 끓인다.',
            imageUrl: '/placeholder.svg?height=150&width=150',
          },
        ],
        imageUrl: '/placeholder.svg?height=200&width=200',
      },
    ];
    setRecipes(dummyRecipes);
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  return (
    <main className="container mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center  flex items-center justify-center">
        <Refrigerator className="mr-2" />
        냉장고 탈탈
      </h1>

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
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="재료 이름"
                className="rounded-full"
              />
              <Button
                onClick={addIngredient}
                className="rounded-full bg-pastel-darkorange hover:bg-pastel-darkorange/80 text-white"
              >
                <Plus size={18} />
                추가
              </Button>
            </div>
            <ul className="space-y-2">
              {ingredients.map((ing) => (
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
          <CardFooter className="bg-pastel-orange">
            <Button
              onClick={searchRecipes}
              className="w-full rounded-full bg-white hover:bg-pastel-lightorange text-pastel-darkorange"
            >
              <Search size={18} className="mr-2" />
              레시피 검색
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card className="mb-8 shadow-lg rounded-2xl overflow-hidden border-4">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ChefHat className="mr-2" />
            레시피 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="grid grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="mb-2">
                <Button
                  variant="outline"
                  onClick={() => openRecipeModal(recipe)}
                  className="w-full h-full rounded-xl hover:bg-pastel-orange/30 flex flex-col items-center justify-center p-4"
                >
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    width={100}
                    height={100}
                    className="rounded-lg mb-2"
                  />
                  {recipe.name}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-2xl border-4 border-pastel-orange">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
              <ChefHat className="mr-2" />
              {selectedRecipe?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Image
                src={selectedRecipe?.imageUrl || ''}
                alt={selectedRecipe?.name || ''}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-2 text-lg">재료:</h3>
            <ul className="list-disc list-inside mb-4 pl-4">
              {selectedRecipe?.ingredients.map((ing, index) => (
                <li key={index} className="mb-1">
                  {ing}
                </li>
              ))}
            </ul>
            <h3 className="font-bold mb-2 text-lg">조리 방법:</h3>
            <ol className="space-y-4">
              {selectedRecipe?.cookingSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={step.imageUrl}
                      alt={`Step ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg">
                      {index + 1}. {step.instruction}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded-full bg-pastel-orange hover:bg-pastel-orange/80 text-white"
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
