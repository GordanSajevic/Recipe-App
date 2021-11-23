import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class RecipeList extends Component {
  state = {
    isLoading: true,
    recipes: [],
    redirect: false,
    recipeId: 0
  };

  async componentDidMount() {
    const response = await fetch('/api/recipes');
    const body = await response.json();
    this.setState({ recipes: body, isLoading: false });
  }

  render() {
    const {recipes, redirect, recipeId} = this.state;

    if (redirect) {
      return <Navigate to={`/recipes/update/${recipeId}`} />;
    }

    const showDetails = (id) => {
      let recipes = this.state.recipes;
      if(!recipes.find(i => i.id === id).show){
        recipes.find(i => i.id === id).show = true;
      }
      else{
        recipes.find(i => i.id === id).show = false;
      }
      this.setState({recipes})
    }


    const redirectTo = (id) => {
      this.setState({redirect: true, recipeId: id})
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro" style={{marginLeft: '0.5em', marginTop: '1em'}}>
            <h2>Recipes</h2>
            {recipes && recipes.length > 0 && recipes.map(recipe =>
              <div>
                <h4 key={recipe.id} onClick={() => showDetails(recipe.id)} style={{ cursor: "pointer"}}>
                  {recipe.name}
                </h4>
                {recipe.show && 
                <div>
                  <div>Description: {recipe.description}</div>
                  <div>Cooking time: {recipe.cookingTime} minutes</div>
                  <div>Meal type: {recipe.mealType}</div>
                  <br />
                  Ingredients:
                  {recipe.ingredientList.map(i => {
                    return <p>
                      <div>{i.name}</div>
                      <div>Amount: {i.amount + " " + i.measureUnit}</div>
                    </p>
                  })}
                  <button onClick={() => redirectTo(recipe.id)}>Update</button>
                </div>}
              </div>
            )}
            {!recipes || recipes.length === 0 && <p>Empty list</p>}
          </div>
        </header>
      </div>
    );
  }
}

export default RecipeList;