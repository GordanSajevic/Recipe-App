package com.geckotech.recipes.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.geckotech.recipes.record.RecipeRecord;

public interface RecipeRepository extends JpaRepository<RecipeRecord, Integer>{
}
