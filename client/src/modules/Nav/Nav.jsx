import React from 'react';
//import SearchBar from './SearchBar.js';
import './Nav.css';
import { NavLink } from 'react-router-dom';


function Nav({onSearch}) {
  return (
    <nav className="nav">
      <NavLink to='/home'>
        <span className="titulo">
          Home
        </span>
      </NavLink>
        {/* <SearchBar
          onSearch={onSearch}
        /> */}
    </nav>
  );
};

export default Nav;
