import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ChefHat,
  RefreshCw,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  getRecipes,
  addRecipe,
  favoriteRecipe,
  deleteRecipe,
} from "../features/recipes/recipesSlice";

import RecipeCard from "../components/ui/RecipeCard";
import Button from "../components/ui/Button";
import AddRecipeForm from "../components/forms/AddRecipeForm";
import type { RecipeFormData } from "../types";

function Recipes() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state) => state.recipes
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !loading && !error) {
      dispatch(getRecipes());
    }
  }, [dispatch, items.length, loading, error]);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(items.map((recipe) => recipe.category)),
    ],
    [items]
  );

  const filteredRecipes = useMemo(() => {
    return items.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory =
        category === "All" || recipe.category === category;

      const matchesFavorite = !favoritesOnly || recipe.favorite;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [items, search, category, favoritesOnly]);

  const handleAddRecipe = async (data: RecipeFormData) => {
    await dispatch(addRecipe(data)).unwrap();
  };

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#246747] dark:text-green-400">
            YOUR FOOD LIBRARY
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            Recipe collection
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Discover, organize and manage all your favourite meals.
          </p>
        </div>

        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} /> Add recipe
        </Button>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 dark:border-gray-700">
            <Search size={19} className="shrink-0 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recipes or ingredients..."
              className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none dark:text-white"
            />
          </div>

          <button
            type="button"
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              favoritesOnly
                ? "border-[#246747] bg-green-50 text-[#246747] dark:bg-green-950/30 dark:text-green-400"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <SlidersHorizontal size={17} />
            {favoritesOnly ? "Favorites only" : "All recipes"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? "bg-[#246747] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-[#246747] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-green-950/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            {favoritesOnly ? "Your favourites" : "All recipes"}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {filteredRecipes.length} recipes found
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(getRecipes())}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold text-[#246747] hover:underline disabled:opacity-50 dark:text-green-400"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading && items.length === 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : error && items.length === 0 ? (
        <div className="rounded-2xl bg-red-50 p-8 text-center dark:bg-red-950/20">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <Button className="mt-4" onClick={() => dispatch(getRecipes())}>
            Try again
          </Button>
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={(id) => dispatch(favoriteRecipe(id))}
              onDelete={(id) => dispatch(deleteRecipe(id))}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <ChefHat size={42} className="mx-auto text-gray-300" />

          <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
            No recipes found
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try another search or add a new recipe to your collection.
          </p>

          <Button className="mt-5" onClick={() => setShowForm(true)}>
            <Plus size={17} /> Add a recipe
          </Button>
        </div>
      )}

      {showForm && (
        <AddRecipeForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddRecipe}
        />
      )}
    </div>
  );
}

export default Recipes;