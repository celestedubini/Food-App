import React from 'react'
import { getByName } from '../../store/actions/RecipesActions';
import {useState} from "react"
import { connect } from 'react-redux';

function SearchBar(props) {
    const [name, setName] = useState("");
    function handleChange(event) {
        setName(event.target.value);
      }
     function handleSubmit(event) {
        event.preventDefault(); 
        props.getByName(name) 
        setName("")
      }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            id="title"
            placeholder="Recipe Name"
            autoComplete="off"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    )
}

function mapStateToProps(state) {
    return {
      recipes: state.recipes
    };
  }

function mapDispatchToProps(dispatch) {
    return {
      getByName: name => dispatch(getByName(name))
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
