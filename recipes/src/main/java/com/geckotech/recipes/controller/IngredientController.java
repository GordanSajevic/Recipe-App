package com.geckotech.recipes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geckotech.recipes.model.Ingredient;
import com.geckotech.recipes.service.IngredientService;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {
	@Autowired
    private IngredientService ingredientService;
	
	@GetMapping("")
    public List<Ingredient> listAll() {
        var ingredients = ingredientService.getAllIngredients();
        return ingredients;
    }
	
	@GetMapping("/{id}")
	public Ingredient getRecipeDetails(@PathVariable Integer id) {
		var ingredient = ingredientService.getIngredientDetails(id);
        return ingredient;
	}
	
	@PostMapping("")
    public void createIngredient(@RequestBody Ingredient ingredient) {
		ingredientService.createIngredient(ingredient);
    }
}
