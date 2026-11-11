import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Recipe, RecipeFormData, RecipesState } from "../../types";
import { fetchRecipes, createRecipe } from "../../services/recipeService";

const initialState: RecipesState = {
  items: [],
  loading: false,
  error: null,
};

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRecipes();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe: RecipeFormData, { rejectWithValue }) => {
    try {
      return await createRecipe(recipe);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Could not add recipe."
      );
    }
  }
);

export const favoriteRecipe = createAsyncThunk(
  "recipes/favoriteRecipe",
  async (id: number) => id
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id: number) => id
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Unable to load recipes.";
      })
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Unable to add recipe.";
      })
      .addCase(favoriteRecipe.fulfilled, (state, action) => {
        const recipe = state.items.find(
          (item) => item.id === action.payload
        );

        if (recipe) {
          recipe.favorite = !recipe.favorite;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default recipesSlice.reducer;