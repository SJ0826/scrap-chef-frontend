'use client';

import React, { ChangeEvent, useState } from 'react';
import { Ingredient } from '@/types/ingredient.interface';
import { IngredientCard } from '@/components/ingredient/IngredientCard';

interface IngredientCardFromMemoryProps {
  handleSearchRecipes: (page: number) => void;
}

export const IngredientCardFromMemory = (
  props: IngredientCardFromMemoryProps
) => {
  const { handleSearchRecipes } = props;
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([
        ...ingredients,
        { id: new Date().getTime(), title: newIngredient },
      ]);
      setNewIngredient('');
    } else {
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const onChangeNewIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(event.target.value);
  };

  return (
    <IngredientCard
      ingredients={ingredients}
      newIngredient={newIngredient}
      onChangeNewIngredient={onChangeNewIngredient}
      handleSearchRecipes={handleSearchRecipes}
      addIngredient={addIngredient}
      removeIngredient={removeIngredient}
    />
  );
};

export default IngredientCardFromMemory;
