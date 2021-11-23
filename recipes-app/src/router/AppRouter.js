import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../common/Header';
import AddRecipe from '../recipes/AddRecipe';
import RecipeList from '../recipes/RecipeList';
import UpdateRecipe from '../recipes/UpdateRecipe';
import AddIngredient from '../ingredients/AddIngredient';
import IngredientList from '../ingredients/IngredientList';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/recipes" exact element={<RecipeList />} />
            <Route path="/recipes/add" element={<AddRecipe />} />
            <Route path="/ingredients" exact element={<IngredientList />} />
            <Route path="/ingredients/add" element={<AddIngredient />} />
            <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;