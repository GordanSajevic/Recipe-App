package com.geckotech.recipes.service;

import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geckotech.recipes.model.Recipe;
import com.geckotech.recipes.record.RecipeRecord;
import com.geckotech.recipes.repository.RecipeRepository;

@Service
public class RecipeService {
	
	@Autowired
    private RecipeRepository recipeRepository;

	public List<Recipe> getAllRecipes(){
		ModelMapper modelMapper = new ModelMapper();
		var recipeRecords = recipeRepository.findAll();
		return modelMapper.map(recipeRecords, new TypeToken<List<Recipe>>() {}.getType());
	}
	
	public Recipe getRecipeDetails(Integer id){
		ModelMapper modelMapper = new ModelMapper();
		var recipeRecord = recipeRepository.findById(id).get();
		return modelMapper.map(recipeRecord, Recipe.class);
	}
	
	public void createRecipe(Recipe recipe) {
		ModelMapper modelMapper = new ModelMapper();
		var recipeRecord = modelMapper.map(recipe, RecipeRecord.class);
		recipeRecord.setDateCreated(new Date());
		recipeRepository.save(recipeRecord);
	}
	
	public void updateRecipe(Recipe recipe) {
		ModelMapper modelMapper = new ModelMapper();
		var recipeRecord = recipeRepository.findById(recipe.getId()).get();
		recipeRecord = modelMapper.map(recipe, RecipeRecord.class);
		recipeRepository.save(recipeRecord);
	}
}
