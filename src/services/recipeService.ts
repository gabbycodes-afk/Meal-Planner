import type { Recipe, RecipeFormData } from "../types";

interface ApiRecipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  cookTimeMinutes: number;
  servings: number;
  mealType?: string[];
  difficulty: string;
  caloriesPerServing: number;
}

interface RecipesApiResponse {
  recipes: ApiRecipe[];
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch("https://dummyjson.com/recipes?limit=20");

  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  const data: RecipesApiResponse = await response.json();

  return data.recipes.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    ingredients: item.ingredients,
    cookTime: item.cookTimeMinutes,
    servings: item.servings,
    category: item.mealType?.[0] ?? "General",
    difficulty: item.difficulty,
    calories: item.caloriesPerServing,
    favorite: false,
  }));
}

export async function createRecipe(
  recipe: RecipeFormData
): Promise<Recipe> {
  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: recipe.name,
      ingredients: recipe.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter(Boolean),
      cookTimeMinutes: Number(recipe.cookTime),
      servings: Number(recipe.servings),
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      mealType: ["General"],
      difficulty: "Easy",
      caloriesPerServing: 350,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add recipe.");
  }

  const result: ApiRecipe = await response.json();

  return {
    id: result.id,
    name: result.name,
    image: result.image,
    ingredients: result.ingredients,
    cookTime: result.cookTimeMinutes,
    servings: result.servings,
    category: result.mealType?.[0] ?? "General",
    difficulty: result.difficulty,
    calories: result.caloriesPerServing,
    favorite: false,
  };
}