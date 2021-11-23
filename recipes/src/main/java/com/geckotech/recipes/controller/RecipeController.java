package com.geckotech.recipes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geckotech.recipes.model.Recipe;
import com.geckotech.recipes.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
	
	@Autowired
    private RecipeService recipeService;
	
	@GetMapping("")
    public List<Recipe> listAll() {
        var recipes = recipeService.getAllRecipes();
        return recipes;
    }
	

	@GetMapping("/{id}")
	public Recipe getRecipeDetails(@PathVariable Integer id){
		var recipe = recipeService.getRecipeDetails(id);
        return recipe;
	}
	
	@PostMapping("")
	public void createRecipe(@RequestBody Recipe recipe) {
        recipeService.createRecipe(recipe);
    }
	
	@PutMapping("")
	public void updateRecipe(@RequestBody Recipe recipe) {
        recipeService.updateRecipe(recipe);
    }
}
