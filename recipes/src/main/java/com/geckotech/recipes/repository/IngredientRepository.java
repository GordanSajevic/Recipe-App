package com.geckotech.recipes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geckotech.recipes.record.IngredientRecord;

public interface IngredientRepository  extends JpaRepository<IngredientRecord, Integer>{

}
