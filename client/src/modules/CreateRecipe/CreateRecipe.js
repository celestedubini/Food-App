import React from 'react';
import { useEffect } from 'react';
import { getTypes } from '../../store/actions/RecipesActions';
import { connect } from 'react-redux';

// export function validate(input) {
//     let errors = {};

//     if (!input.title) {
//         errors.title = 'title is required'; // errors = {title: 'title is required'}
//     } else if (!/\S+@\S+\.\S+/.test(input.title)) {
//         errors.title = 'title is invalid';  // errors = {title: 'title is invalid'}
//     }

//     if(!input.summary){
//         errors.summary = 'summary is required'; // errors = {summary: 'summary is required'}
//         // errors = {title: 'title is required', summary: 'summary is required'}
//     }else if(!/(?=.*[0-9])/.test(input.summary)){
//         errors.summary = 'summary is invalid';
//     }

//     return errors; // esto es un objeto que puede tener title y/o summary
// };

function Form(props) {
    function getTypesFunction() {
        props.getTypes()
    }
    useEffect(() => {
        getTypesFunction()
    }, [])



    // utilizar React.useState para que pasen los tests con useState solo puede
    // que no pase
    const [input, setInput] = React.useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        instructions: '',
        typeDiets: [], 
        image: ''
    });
    // input = {title: '', summary: ''}
    const [errors, setErrors] = React.useState({});

    const handleInputChange = function (e) {
        setInput(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));

        // setInput({...input, [e.target.name]:e.target.value})

        // validate(input)

        // let objError = validate({
        //     ...input, [e.target.name]: e.target.value
        // }); // objError = {title, summary} // {} // {title} // {summary}

        // setErrors(objError);

    };

    function handleSelect(e) {
        if (e.target.checked) {
            setInput((prev) => ({ ...prev, typeDiets: [...prev.typeDiets, e.target.value] }));
        } else {
            setInput((prev) => ({ ...prev, typeDiets: [...prev.typeDiets].filter((typeDiet) => e.target.value !== typeDiet) }));
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div>
                <label>Title * </label>
                <input type="text" name="title" className={errors.title && 'danger'}
                    onChange={handleInputChange} value={input.title} required="required" />
                {/* {
                    errors.title && (
                        <p className='danger'>{errors.title}</p>
                    )
              } */}
            </div>
            <div>
                <label>Summary * </label>
                <textarea name="summary" className={errors.summary && 'danger'}
                    onChange={handleInputChange} value={input.summary} rows="10" cols="50" required="required" />
                {/* {
                  errors.summary && (
                      <p className='danger'>{errors.summary}</p>
                  )
              } */}
            </div>
            <div>
                <label>Score </label>
                <input type="number" name="spoonacularScore" min="0" max="100"
                    onChange={handleInputChange} value={input.spoonacularScore} />
            </div>
            <div>
                <label>Health Score </label>
                <input type="number" name="healthScore" min="0" max="100"
                    onChange={handleInputChange} value={input.healthScore} />
            </div>
            <div>
                <label>Steps </label>
                <textarea name="instructions" className={errors.summary && 'danger'}
                    onChange={handleInputChange} value={input.instructions} rows="10" cols="50" />
            </div>
            <div>
                <label>Select the type diets:</label>
                {props.typeDiets.map((e) => (
                    <div>
                        <input key={e.id} onChange={handleSelect} type="checkbox" value={e.id} /> {e.name}
                    </div>
                ))}</div>
            <div>
                <label>Image: </label>
                <input type="url" name="image" className={errors.summary && 'danger'}
                    onChange={handleInputChange} value={input.image}/>
            </div>
            <input type="submit" value="Add Recipe" />
        </form>
    )
}

const mapStateToProps = state => {
    return {
        typeDiets: state.typeDiets
    }
}


export default connect(mapStateToProps, { getTypes })(Form)