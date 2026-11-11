
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  Users,
  Flame,
  ChefHat,
  Heart,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getRecipes, favoriteRecipe } from "../features/recipes/recipesSlice";
import Button from "../components/ui/Button";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state) => state.recipes
  );

  const recipe = items.find((item) => item.id === Number(id));

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(getRecipes());
    }
  }, [dispatch, items.length, loading, error]);

  if (loading && !recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#246747]" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading recipe...
          </p>
        </div>
      </div>
    );
  }

  if (error && !recipe) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-semibold text-red-500">{error}</p>
        <Button
          className="mt-4"
          onClick={() => dispatch(getRecipes())}
        >
          Try again
        </Button>
        <button
          onClick={() => navigate("/recipes")}
          className="mt-3 text-sm font-medium text-[#246747] hover:underline"
        >
          Back to recipes
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <ChefHat size={48} className="text-gray-300" />
        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          Recipe not found
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This recipe may have been removed or may no longer be available.
        </p>
        <Button className="mt-5" onClick={() => navigate("/recipes")}>
          Back to recipes
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <button
        onClick={() => navigate("/recipes")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#246747] dark:text-gray-400"
      >
        <ArrowLeft size={18} />
        Back to recipes
      </button>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="relative h-64 sm:h-80 lg:h-[420px]">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />

          <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#246747] shadow">
            {recipe.category}
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#246747]">
                Savorly recipe
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                {recipe.name}
              </h1>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {recipe.difficulty} · {recipe.calories} kcal per serving
              </p>
            </div>

            <Button
              variant={recipe.favorite ? "secondary" : "outline"}
              onClick={() => dispatch(favoriteRecipe(recipe.id))}
            >
              <Heart
                size={17}
                className={recipe.favorite ? "fill-red-500 text-red-500" : ""}
              />
              {recipe.favorite ? "Favorited" : "Add to favorites"}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f4f7f2] p-4 dark:bg-gray-800">
              <Clock3 className="text-[#246747]" size={22} />
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Cooking time
              </p>
              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                {recipe.cookTime} minutes
              </p>
            </div>

            <div className="rounded-2xl bg-[#f4f7f2] p-4 dark:bg-gray-800">
              <Users className="text-[#246747]" size={22} />
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Servings
              </p>
              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                {recipe.servings} people
              </p>
            </div>

            <div className="rounded-2xl bg-[#f4f7f2] p-4 dark:bg-gray-800">
              <Flame className="text-orange-500" size={22} />
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Calories
              </p>
              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                {recipe.calories} kcal
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Ingredients
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Everything you need to prepare this meal.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={`${ingredient}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f1e9] text-xs font-bold text-[#246747] dark:bg-green-900/40 dark:text-green-300">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
