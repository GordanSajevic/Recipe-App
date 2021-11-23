package com.geckotech.recipes.service;

import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geckotech.recipes.model.Ingredient;
import com.geckotech.recipes.record.IngredientRecord;
import com.geckotech.recipes.repository.IngredientRepository;

@Service
public class IngredientService {
	
	@Autowired
    private IngredientRepository ingredientRepository;
	
	public List<Ingredient> getAllIngredients(){
		ModelMapper modelMapper = new ModelMapper();
		var ingredientRecords = ingredientRepository.findAll();
        return modelMapper.map(ingredientRecords, new TypeToken<List<Ingredient>>() {}.getType());
	}
	
	public Ingredient getIngredientDetails(Integer id) {
		ModelMapper modelMapper = new ModelMapper();
		var ingredientRecord = ingredientRepository.findById(id);
		return modelMapper.map(ingredientRecord, Ingredient.class);
	}
	
	public void createIngredient(Ingredient ingredient) {
		ModelMapper modelMapper = new ModelMapper();
		var ingredientRecord = modelMapper.map(ingredient, IngredientRecord.class);
		ingredientRecord.setDateCreated(new Date());
		ingredientRepository.save(ingredientRecord);
	}
}
