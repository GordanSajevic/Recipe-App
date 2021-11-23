import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { Navigate } from 'react-router-dom';

const IngredientForm = (props) => {
  const [ingredient, setIngredient] = useState({
    name: props.ingredient ? props.ingredient.name : '',
    amount: props.ingredient ? props.ingredient.amount  : '',
    measureUnit: props.ingredient ? props.ingredient.measureUnit  : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { name, amount, measureUnit } = ingredient;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [ingredient.name, ingredient.amount, ingredient.measureUnit ];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const ingredient = {
        name: values[0],
        amount: values[1], 
        measureUnit: values[2]
      };
      props.handleOnSubmit(ingredient);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setIngredient({ name: "", amount: "", measureUnit: "" } );
    setErrorMsg(errorMsg);
    if(!errorMsg){
      setRedirect(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'amount':
        if (value === '' || parseInt(value) === +value) {
            setIngredient((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setIngredient((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  const options = [
    { value: 'kg', label: 'Kilogram' },
    { value: 'mg', label: 'Milligram' },
    { value: 'l', label: 'Litre' },
    { value: 'ml', label: 'Millilitre' }
  ];

  const onSelect = (e) => {
    ingredient.measureUnit = e.value;
  }

  if (redirect) {
    return <Navigate to={`/ingredients`} />;
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
            placeholder="Enter name of ingredient"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cookingTime">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="amount"
            step={0.1}
            value={amount}
            placeholder="Enter amount"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="mealType">
          <Form.Label>Measure unit</Form.Label>
          <Select options={options} onChange={onSelect} />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default IngredientForm;