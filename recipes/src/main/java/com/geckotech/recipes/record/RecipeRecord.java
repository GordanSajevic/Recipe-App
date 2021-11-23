package com.geckotech.recipes.record;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.sun.istack.NotNull;


@Entity
@Table(name = "recipes")
public class RecipeRecord {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotNull
	private String name;
	private String description;
	@NotNull
	private Integer cookingTime;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
	  name = "recipes_ingredient_list", 
	  joinColumns = @JoinColumn(name = "recipe_record_id"), schema = "public", 
	  inverseJoinColumns = @JoinColumn(name = "ingredient_list_id"))
	private List<IngredientRecord> ingredientList;
	@NotNull
	private String mealType;
	@NotNull
	private Date dateCreated;
	private Date dateUpdated;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getCookingTime() {
		return cookingTime;
	}
	public void setCookingTime(Integer cookingTime) {
		this.cookingTime = cookingTime;
	}
	public String getMealType() {
		return mealType;
	}
	public void setMealType(String mealType) {
		this.mealType = mealType;
	}
	public List<IngredientRecord> getIngredientList() {
		return ingredientList;
	}
	public void setIngredientList(List<IngredientRecord> ingredientList) {
		this.ingredientList = ingredientList;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	public Date getDateUpdated() {
		return dateUpdated;
	}
	public void setDateUpdated(Date dateUpdated) {
		this.dateUpdated = dateUpdated;
	}
}
