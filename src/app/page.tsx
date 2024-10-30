'use client';

import { Refrigerator, Carrot, Plus, X } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Ingredient = {
  id: number;
  name: string;
};

// type Recipe = {
//   id: number;
//   name: string;
//   ingredients: string[];
//   instructions: string;
//   imageUrl: string;
// };

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, { id: Date.now(), name: newIngredient }]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
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
        </CardHeader>
      </Card>
    </main>
  );
}
