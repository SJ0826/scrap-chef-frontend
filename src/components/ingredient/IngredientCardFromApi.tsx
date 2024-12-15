'use client';

import React, { ChangeEvent, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getIngredientsApi,
  postNewIngredientApi,
  removeIngredientApi,
} from '@/services/ingredients';
import { IngredientCard } from '@/components/ingredient/IngredientCard';

interface IngredientCardFromApiProps {}

const IngredientCardFromApi = (props: IngredientCardFromApiProps) => {
  const [newIngredient, setNewIngredient] = useState('');

  const { data: ingredients, refetch: refetchIngredients } = useQuery({
    initialData: undefined,
    queryKey: ['ingredients'],
    queryFn: getIngredientsApi,
  });

  const { mutate: addNewIngredientMutation } = useMutation({
    mutationFn: postNewIngredientApi,
    onSuccess: () => {
      refetchIngredients();
    },
  });

  const { mutate: removeIngredientMutation } = useMutation({
    mutationFn: removeIngredientApi,
    onSuccess: () => {
      refetchIngredients();
    },
  });

  const onChangeNewIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(event.target.value);
  };

  return (
    <IngredientCard
      ingredients={ingredients?.data?.ingredients}
      newIngredient={newIngredient}
      onChangeNewIngredient={onChangeNewIngredient}
      handleSearchRecipes={() => {}}
      addIngredient={() => addNewIngredientMutation(newIngredient)}
      removeIngredient={removeIngredientMutation}
    />
  );
};

IngredientCardFromApi.propTypes = {};

export default IngredientCardFromApi;
