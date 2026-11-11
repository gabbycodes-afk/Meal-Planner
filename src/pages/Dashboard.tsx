
import { useEffect, useState } from "react";
import {
  ChefHat,
  Clock3,
  Heart,
  Plus,
  ArrowRight,
  Flame,
  Utensils,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  getRecipes,
  addRecipe,
  favoriteRecipe,
  deleteRecipe,
} from "../features/recipes/recipesSlice";

import RecipeCard from "../components/ui/RecipeCard";
import StatCard from "../components/ui/StatCard";
import AddRecipeForm from "../components/forms/AddRecipeForm";
import type { RecipeFormData } from "../types";

function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useAppSelector(
    (state) => state.recipes
  );

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getRecipes());
    }
  }, [dispatch, items.length]);

  const handleAddRecipe = async (data: RecipeFormData) => {
    await dispatch(addRecipe(data)).unwrap();
  };

  const favorites = items.filter((recipe) => recipe.favorite);

  const totalIngredients = items.reduce(
    (total, recipe) => total + recipe.ingredients.length,
    0
  );

  const featuredRecipes = items.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#205b3d] via-[#246747] to-[#347c54] p-7 text-white shadow-xl shadow-green-900/10 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-50">
            <Sparkles size={14} /> YOUR KITCHEN DASHBOARD
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            What's cooking
            <br />
            today?
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-green-50/80">
            Keep your recipes organized, discover meal inspiration and
            make planning your next delicious meal effortless.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#246747] shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
            >
              <Plus size={18} /> Add a recipe
            </button>

            <button
              type="button"
              onClick={() => navigate("/recipes")}
              className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore recipes <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 hidden opacity-20 xl:block">
          <ChefHat size={190} strokeWidth={1} />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          role="button"
          tabIndex={0}
          aria-label="View all recipes"
          onClick={() => navigate("/recipes")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              navigate("/recipes");
            }
          }}
          className="cursor-pointer rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#246747]"
        >
          <StatCard
            title="Total recipes"
            value={String(items.length)}
            subtitle="In your collection"
            icon={<BookOpenIcon />}
            color="bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
          />
        </div>

        <StatCard
          title="Saved favorites"
          value={String(favorites.length)}
          subtitle="Recipes you love"
          icon={<Heart size={21} />}
          color="bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
        />

        <StatCard
          title="Average cook time"
          value={
            items.length
              ? `${Math.round(
                  items.reduce((sum, recipe) => sum + recipe.cookTime, 0) /
                    items.length
                )} min`
              : "0 min"
          }
          subtitle="Across your recipes"
          icon={<Clock3 size={21} />}
          color="bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
        />

        <StatCard
          title="Ingredients"
          value={String(totalIngredients)}
          subtitle="Across your collection"
          icon={<Utensils size={21} />}
          color="bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
      </section>

      {/* Quick information */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <CalendarDays size={23} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Plan your meals
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Organize your food ideas in one place.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <Flame size={23} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Keep discovering
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Build a collection of meals worth making.
            </p>
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#246747] dark:text-green-400">
              YOUR COLLECTION
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
              Featured recipes
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/recipes")}
            className="flex items-center gap-2 text-sm font-semibold text-[#246747] hover:underline dark:text-green-400"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        {loading && items.length === 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : error && items.length === 0 ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
            <button
              type="button"
              onClick={() => dispatch(getRecipes())}
              className="mt-3 text-sm font-bold text-[#246747] dark:text-green-400"
            >
              Try again
            </button>
          </div>
        ) : featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavorite={(id) => dispatch(favoriteRecipe(id))}
                onDelete={(id) => dispatch(deleteRecipe(id))}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
            <ChefHat size={35} className="mx-auto text-gray-400" />
            <p className="mt-3 font-semibold text-gray-700 dark:text-white">
              Your recipe collection is empty.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm font-bold text-[#246747] dark:text-green-400"
            >
              Add your first recipe
            </button>
          </div>
        )}
      </section>

      {showForm && (
        <AddRecipeForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddRecipe}
        />
      )}
    </div>
  );
}

function BookOpenIcon() {
  return <ChefHat size={21} />;
}

export default Dashboard;
