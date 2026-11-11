export interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  cookTime: number;
  servings: number;
  category: string;
  difficulty: string;
  calories: number;
  favorite: boolean;
}

export interface RecipeFormData {
  name: string;
  ingredients: string;
  cookTime: string;
  servings: string;
}

export interface RecipesState {
  items: Recipe[];
  loading: boolean;
  error: string | null;
}