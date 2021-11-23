import React from 'react';
import RecipeForm from './RecipeForm';

const AddRecipe = () => {
  const handleOnSubmit = (recipe) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    };
    fetch('/api/recipes', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));

  };

  return (
    <React.Fragment>
      <RecipeForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddRecipe;