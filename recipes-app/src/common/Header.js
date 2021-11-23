import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{marginLeft: '0.5em'}}>
      <h1>Recipe Management</h1>
      <hr />
      <div className="links">
        <NavLink to="/recipes" className="link" activeClassName="active" exact>
          Recipe List
        </NavLink>
        <div>&nbsp;</div>
        <NavLink to="/ingredients" className="link" activeClassName="active" exact>
          Ingredient List
        </NavLink>
        <div>&nbsp;</div>
        <NavLink to="/recipes/add" className="link" activeClassName="active">
          Add Recipe
        </NavLink>
        <div>&nbsp;</div>
        <NavLink to="/ingredients/add" className="link" activeClassName="active">
          Add Ingredient
        </NavLink>
      </div>
    </header>
  );
};

export default Header;