import React from 'react';
import IngredientForm from './IngredientForm';

const AddIngredient = () => {
  const handleOnSubmit = (ingredient) => {
   
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredient)
  };
    fetch('/api/ingredients', requestOptions);
  };

  return (
    <React.Fragment>
      <IngredientForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddIngredient;