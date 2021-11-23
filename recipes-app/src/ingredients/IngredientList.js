import React, { Component } from 'react';

class IngredientList extends Component {
  state = {
    isLoading: true,
    ingredients: []
  };

  async componentDidMount() {
    const response = await fetch('/api/ingredients');
    const body = await response.json();
    this.setState({ ingredients: body, isLoading: false });
  }

  render() {
    const {ingredients} = this.state;


    const showDetails = (id) => {
      let ingredients = this.state.ingredients;
      if(!ingredients.find(i => i.id === id).show){
        ingredients.find(i => i.id === id).show = true;
      }
      else{
        ingredients.find(i => i.id === id).show = false;
      }
      this.setState({ingredients})
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro" style={{marginLeft: '0.5em', marginTop: '1em'}}>
            <h2>Ingredients</h2>
            {ingredients && ingredients.length > 0 && ingredients.map(ingredient =>
              <div>
              <h4 key={ingredient.id} onClick={() => showDetails(ingredient.id)} style={{ cursor: "pointer"}}>
                {ingredient.name}
              </h4>
              {ingredient.show && 
                <div>
                  <div>Amount: {ingredient.amount + " " + ingredient.measureUnit}</div>
                </div>}
              </div>
            )}
            {!ingredients || ingredients.length === 0 && <p>Empty list</p>}
          </div>
        </header>
      </div>
    );
  }
}

export default IngredientList;