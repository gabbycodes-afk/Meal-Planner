
import { Clock3, Heart, Users, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../../types";

interface RecipeCardProps {
  recipe: Recipe;
  onFavorite: (id: number) => void;
  onDelete?: (id: number) => void;
}

function RecipeCard({ recipe, onFavorite, onDelete }: RecipeCardProps) {
  const navigate = useNavigate();

  const openRecipe = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openRecipe}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRecipe();
        }
      }}
      aria-label={`View ${recipe.name} recipe`}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#246747] dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#246747]">
          {recipe.category}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFavorite(recipe.id);
          }}
          aria-label={
            recipe.favorite ? "Remove from favorites" : "Add to favorites"
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Heart
            size={18}
            className={
              recipe.favorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-bold text-gray-900 dark:text-white">
            {recipe.name}
          </h3>

          {onDelete && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(recipe.id);
              }}
              aria-label="Delete recipe"
              className="text-gray-400 transition hover:text-red-500"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {recipe.difficulty} · {recipe.calories} kcal per serving
        </p>

        <div className="mt-4 flex items-center gap-5 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Clock3 size={15} />
            {recipe.cookTime} mins
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={15} />
            {recipe.servings} servings
          </span>
        </div>

        <p className="mt-3 text-xs font-semibold text-[#246747] dark:text-green-400">
          View recipe details →
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
