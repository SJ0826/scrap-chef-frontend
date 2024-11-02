interface ManualStep {
  step: string;
  imageUrl: string;
}

interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  ingredients: string[];
  manualSteps: ManualStep[];
}

interface RecipesData {
  recipes: {
    totalCount: string;
    recipe: Recipe[];
  };
}
