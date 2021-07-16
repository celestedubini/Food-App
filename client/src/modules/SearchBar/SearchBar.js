import React from 'react'
import { getByName } from '../../store/actions/RecipesActions';

function SearchBar(props) {
    const [title, setTitle] = useState("");
    function handleChange(event) {
        setName({ title: event.target.value });
      }
     function handleSubmit(event) {
        event.preventDefault(); //Previene que la página recargue de vuelta
        props.getByName(title.name) //Sigue utilizando el estado local para el input
      }
    return (
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">Película: </label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={title} //El valor es el estado local
            onChange={(e) => handleChange(e)} //Esto actualiza el estado cada vez que escribo en el input
          />
        </div>
        <button type="submit">BUSCAR</button>
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
