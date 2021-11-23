import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { Navigate } from 'react-router-dom';

const RecipeForm = (props) => {
  const [recipe, setRecipe] = useState({
    name: props.recipe ? props.recipe.name : '',
    description: props.recipe ? props.recipe.description  : '',
    cookingTime: props.recipe ? props.recipe.cookingTime  : '',
    mealType: props.recipe ? props.recipe.mealType  : '',
    ingredientList: []
  });
  const [ingredientList, setIngredients] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { name, description, cookingTime, mealType} = recipe;
  
  useEffect(() => {
    async function getIngredients() {
      const response = await fetch('/api/ingredients');
      const body = await  response.json();
      setIngredients(body);
    }
    getIngredients();
    let url = window.location.href;
    let recipeId = url.substring(url.lastIndexOf('/') + 1);
    if(Number.isInteger(Number.parseInt(recipeId))){
      async function getRecipe() {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const body = await  response.json();
        setRecipe(body);
      }
      getRecipe();
      setRecipeId(recipeId);
    }
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [recipe.name, recipe.cookingTime, recipe.mealType, recipe.ingredientList];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
    if(ingredientList.length === 0){
      errorMsg = 'You have to add ingredients first!'
    }
    else if (allFieldsFilled) {
      const recipe = {
        name: values[0],
        description, 
        cookingTime: values[1], 
        mealType: values[2],
        ingredientList: values[3],
        id: recipeId
      };
      props.handleOnSubmit(recipe);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
    if(!errorMsg){
      setRedirect(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'cookingTime':
        if (value === '' || parseInt(value) === +value) {
            setRecipe((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setRecipe((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  const onCheck = (event) => {
    if(event.target.checked){
      let ingredient = ingredientList.find(i => i.id.toString() === event.target.id);
      recipe.ingredientList.push(ingredient);
    }
  }

  const getIngredientCheckboxes = () => {
    return ingredientList && ingredientList.map(i => {
      return <Form.Check
              label={i.name}
              id={i.id}
              onChange={onCheck}
              title={i.name}
              defaultChecked={recipe.ingredientList.find(ing => ing.id === i.id)}
            />
    });
  }

  const onSelect = (e) => {
    recipe.mealType = e.value;
  }

  const options = [
    { value: 'lunch', label: 'Lunch' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'dinner', label: 'Dinner' }
  ];

  if (redirect) {
    return <Navigate to={`/recipes`} />;
  }
  return (
    <div className="main-form" style={{marginLeft: '0.5em', marginTop: '1em'}}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Enter name of recipe"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cookingTime">
          <Form.Label>Cooking time</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="cookingTime"
            value={cookingTime}
            placeholder="Enter cooking time"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="mealType">
          <Form.Label>Meal Type</Form.Label>
          <Select options={options} onChange={onSelect} value={options.find(o => o.value === mealType)}
            />
        </Form.Group>
        <Form.Group controlId="mealType">
          <Form.Label>Ingredients</Form.Label>
          {getIngredientCheckboxes()}
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RecipeForm;