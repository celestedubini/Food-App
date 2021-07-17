import React from 'react';
//import SearchBar from './SearchBar.js';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


function Nav({onSearch}) {
  return (
    <nav className="nav">
      <NavLink to='/home'>
        <span className="titulo">
          Home
        </span>
      </NavLink>
      <NavLink to='/recipe'>
        <span className="titulo">
          Create Recipe
        </span>
      </NavLink>
        <SearchBar
        />
    </nav>
  );
};

export default Nav;
