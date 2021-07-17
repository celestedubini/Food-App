import React from 'react';
//import SearchBar from './SearchBar.js';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';


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
        <Filter/>
    </nav>
  );
};

export default Nav;
