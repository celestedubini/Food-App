import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


function Nav({onSearch}) {
  return (
    <nav className="nav">
      <NavLink to='/home'>
        <span className="titulo">
          <div className="henryTitle">Henry</div>
          <div className="foodTitle">Food</div>
        </span>
      </NavLink>
      <NavLink to='/recipe' activeClassName="activeCreacion">
        <span className="creacion">
          Create Recipe
        </span>
      </NavLink>
      <SearchBar
        />
        
    </nav>
  );
};

export default Nav;
