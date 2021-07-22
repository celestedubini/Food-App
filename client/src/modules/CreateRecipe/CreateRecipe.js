import React from 'react';
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



    // utilizar React.useState para que pasen los tests con useState solo puede
    // que no pase
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
            let config = {
                method: "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
            let res = await fetch("http://localhost:3001/recipe", config)
            let json = await res.json()
            console.log(json)
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
                <p className="red">(*) Required</p>
                <form onSubmit={(e) => onSubmit(e)} className="form1">
                    <div>
                        <label>Title (*) </label>
                        <input type="text" name="title"
                            onChange={handleInputChange} value={input.title} required="required" className="caja" />
                        {
                            errors.title && (
                                <p className="red">{errors.title}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Summary (*) </label>
                        <textarea name="summary"
                            onChange={handleInputChange} value={input.summary} rows="10" cols="50" required="required" className="caja" />
                        {
                            errors.summary && (
                                <p className="red">{errors.summary}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Score (*)</label>
                        <input type="number" name="spoonacularScore" min="0" max="100"
                            onChange={handleInputChange} value={input.spoonacularScore} className="caja" />
                        {
                            errors.spoonacularScore && (
                                <p className="red">{errors.spoonacularScore}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Health Score (*)</label>
                        <input type="number" name="healthScore" min="0" max="100"
                            onChange={handleInputChange} value={input.healthScore} className="caja" />
                        {
                            errors.healthScore && (
                                <p className="red">{errors.healthScore}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Steps </label>
                        <textarea name="instructions"
                            onChange={handleInputChange} value={input.instructions} rows="10" cols="50" className="caja" />
                    </div>
                    <div >
                        <label>Select the type diets:</label>
                        {props.diets.length !== 0 ? props.diets.map((e) => (
                            <div>
                                <div key={e.id} className="checkboxs">
                                    <input onChange={handleSelect} type="checkbox" value={e.id} /> {e.name}
                                </div></div>
                        )) : " Loading"}</div>
                    <div>
                        <label>Image </label>
                        <input type="url" name="image"
                            onChange={handleInputChange} value={input.image} className="caja" />
                    </div>

                    <input type="submit" value="Add Recipe" className="botonAgregar" />
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