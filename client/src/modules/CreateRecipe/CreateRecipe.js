import React from 'react';
import axios from "axios";
import { useEffect } from 'react';
import { getTypes } from '../../store/actions/RecipesActions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./CreateRecipe.css"

const initialForm = {
    title: '',
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    instructions: '',
    diets: [],
    image: ''
}

export function validate(input) {
    let errors = {};
    if (!input.title) {
        errors.title = 'Title is required';
    }
    if (!input.summary) {
        errors.summary = 'Summary is required';
    }
    if (!/^[1-9][0-9]?$|^100$/g.test(input.spoonacularScore)) {
        errors.spoonacularScore = 'Score is required and must be in a range from 1 - 100';
    }
    if (!/^[1-9][0-9]?$|^100$/g.test(input.healthScore)) {
        errors.healthScore = 'Health Score is required and must be in a range from 1 - 100';
    }
    return errors;
};

function Form(props) {
    function getTypesFunction() {
        props.getTypes()
    }
    useEffect(() => {
        getTypesFunction()
    }, [])



    const [input, setInput] = React.useState(initialForm);

    const [errors, setErrors] = React.useState({});

    const handleInputChange = function (e) {
        setInput(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));

        let objError = validate({
            ...input, [e.target.name]: e.target.value
        });
        setErrors(objError);
    };

    function handleSelect(e) {
        if (e.target.checked) {
            setInput((prev) => ({ ...prev, diets: [...prev.diets, e.target.value] }));
        } else {
            setInput((prev) => ({ ...prev, diets: [...prev.diets].filter((typeDiet) => e.target.value !== typeDiet) }));
        }
    };

    const onSubmit = async function (e) {
        e.preventDefault();
        try {
            await axios.post("/recipe", JSON.stringify(input), {
                headers: { "Content-Type": "application/json" },
              });
            setInput(initialForm)
            alert('Recipe created successfully!');
        } catch (error) {
            console.log(error)
            alert('We could not create recipe. Please try again.');
        }
    }

    return (
        <div>
            <h1 className="create">Create a Recipe</h1>
            <NavLink to='/home'>
                <button className="botonBack">Back</button>
            </NavLink>
            <div className="formulario">
                <p className="redSub">(*) Please fill in the required field</p>
                <form onSubmit={(e) => onSubmit(e)} className="form1">
                    <div className="columnasForm">
                        <div className="tama??oInput">
                            <label>Title (*) </label>
                            <input type="text" name="title"
                                onChange={handleInputChange} value={input.title} required="required" className="caja" />
                            {
                                errors.title && (
                                    <p className="red">{errors.title}</p>
                                )
                            }
                        </div>
                        <div className="tama??oInput">
                            <label>Summary (*) </label>
                            <textarea name="summary"
                                onChange={handleInputChange} value={input.summary} rows="10" cols="50" required="required" className="caja" />
                            {
                                errors.summary && (
                                    <p className="red">{errors.summary}</p>
                                )
                            }
                        </div>
                        <div className="tama??oInput">
                            <label>Score (*)</label>
                            <input type="number" name="spoonacularScore" min="0" max="100"
                                onChange={handleInputChange} value={input.spoonacularScore} required="required" className="caja" />
                            {
                                errors.spoonacularScore && (
                                    <p className="red">{errors.spoonacularScore}</p>
                                )
                            }
                        </div>
                        <div className="tama??oInput">
                            <label>Health Score (*)</label>
                            <input type="number" name="healthScore" min="0" max="100"
                                onChange={handleInputChange} value={input.healthScore} required="required" className="caja" />
                            {
                                errors.healthScore && (
                                    <p className="red">{errors.healthScore}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="columnasForm">
                        <div className="tama??oInput">
                            <label>Steps </label>
                            <textarea name="instructions"
                                onChange={handleInputChange} value={input.instructions} rows="10" cols="60" className="caja" />
                        </div>
                        <div className="tama??oInput">
                            <label>Select the types of diets</label>
                            {props.diets.length !== 0 ? (<div className="cajitas"> {props.diets.map((e) => (
                                <div className="spaciar">
                                    <div key={e.id} className="checkboxs">
                                        <input onChange={handleSelect} type="checkbox" value={e.id} /> {e.name}
                                    </div></div>
                            ))}</div>) : " Loading"}</div>
                    </div>
                    <div className="columnasForm">
                        <div className="ultimoInput">
                            <label>Image </label>
                            <input type="url" name="image"
                                onChange={handleInputChange} value={input.image} className="caja" />
                        </div>
                        <input type="submit" value="Add Recipe" className="botonAgregar" />
                    </div>
                </form>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        diets: state.diets
    }
}


export default connect(mapStateToProps, { getTypes })(Form)