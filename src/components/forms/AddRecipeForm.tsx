import { useState, type FormEvent } from "react";
import { X, ChefHat } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import type { RecipeFormData } from "../../types";

interface AddRecipeFormProps {
  onClose: () => void;
  onSubmit: (recipe: RecipeFormData) => Promise<void>;
}

function AddRecipeForm({ onClose, onSubmit }: AddRecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    ingredients: "",
    cookTime: "",
    servings: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof RecipeFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Recipe name is required.";
    }

    if (
      !formData.ingredients.trim() ||
      formData.ingredients.split(",").every((item) => !item.trim())
    ) {
      newErrors.ingredients = "Enter at least one ingredient.";
    }

    if (!formData.cookTime || Number(formData.cookTime) <= 0) {
      newErrors.cookTime = "Enter a valid cooking time.";
    }

    if (!formData.servings || Number(formData.servings) <= 0) {
      newErrors.servings = "Enter a valid number of servings.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch {
      setErrors({ form: "Unable to save recipe. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-[#246747]">
              <ChefHat size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Add a new recipe
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Share something delicious with your collection.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Recipe name"
            placeholder="e.g. Creamy chicken pasta"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            error={errors.name}
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Ingredients
            </label>

            <textarea
              rows={4}
              placeholder="Chicken, pasta, cream, garlic, pepper..."
              value={formData.ingredients}
              onChange={(event) =>
                handleChange("ingredients", event.target.value)
              }
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#246747] focus:ring-2 focus:ring-[#246747]/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />

            <p className="text-xs text-gray-400">
              Separate each ingredient with a comma.
            </p>

            {errors.ingredients && (
              <p className="text-xs text-red-500">{errors.ingredients}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Cook time (minutes)"
              type="number"
              min="1"
              placeholder="30"
              value={formData.cookTime}
              onChange={(event) =>
                handleChange("cookTime", event.target.value)
              }
              error={errors.cookTime}
            />

            <Input
              label="Servings"
              type="number"
              min="1"
              placeholder="4"
              value={formData.servings}
              onChange={(event) =>
                handleChange("servings", event.target.value)
              }
              error={errors.servings}
            />
          </div>

          {errors.form && (
            <p className="text-sm text-red-500">{errors.form}</p>
          )}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" isLoading={loading}>
              Save recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;