import React from 'react';

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

export default function Form() {

    // utilizar React.useState para que pasen los tests con useState solo puede
    // que no pase
    const [input, setInput] = React.useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        step2step: '',
        typeDiets: []
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

        }
    }

    return (
        <form onSubmit={(e) =>onSubmit(e)}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" className={errors.title && 'danger'}
                    onChange={handleInputChange} value={input.title} />
                {/* {
                    errors.title && (
                        <p className='danger'>{errors.title}</p>
                    )
              } */}
            </div>
            <div>
                <label>Summary:</label>
                <textarea name="summary" className={errors.summary && 'danger'}
                    onChange={handleInputChange} value={input.summary} rows="10" cols="50" />
                {/* {
                  errors.summary && (
                      <p className='danger'>{errors.summary}</p>
                  )
              } */}
            </div>
            <div>
                <label>Score:</label>
                <input type="number" name="spoonacularScore" min="0" max="100"
                    onChange={handleInputChange} value={input.spoonacularScore} />
            </div>
            <div>
                <label>Health Score:</label>
                <input type="number" name="healthScore" min="0" max="100"
                    onChange={handleInputChange} value={input.healthScore} />
            </div>
            <div>
                <label>Steps:</label>
                <textarea name="step2step" className={errors.summary && 'danger'}
                    onChange={handleInputChange} value={input.step2step} rows="10" cols="50" />
            </div>
            <input type="submit" value="Add Recipe" />
        </form>
    )
}