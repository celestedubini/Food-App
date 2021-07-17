import React from 'react'
import { useEffect } from "react";
import { connect } from 'react-redux';
import { getDetail } from '../../store/actions/RecipesActions';

class RecipeDetail extends React.Component {
    

    componentDidMount() {
        // ya sabemos que el componente fue montado
        // ahora podemos empezar a realizar acciones con el mismo
        // por ejemplo ... consultas con la api ..... entonces puedo invocar a la accion
        // getMovieDetail !
        this.props.getDetail(this.props.match.params.id)
    }

    render() {console.log(this.props.recipeId.typeDiets);
        return (
            <div>
                {this.props.recipeId ?
                    <div>
                        <div>
                            <h2>
                                {this.props.recipeId.title}
                            </h2>
                        </div>
                        <img src={this.props.recipeId.image} alt={"img"} />
                        {/* <p>Types of Diet: {this.props.recipeId.diets? this.props.recipeId.diets : this.props.recipeId.typeDiets.map(diet => diet.name)}</p> */}
                        <p>Summary: {this.props.recipeId.summary}</p>
                        <p>Score: {this.props.recipeId.spoonacularScore? this.props.recipeId.spoonacularScore : this.props.recipeId.score}</p>
                        <p>Health Score: {this.props.recipeId.healthScore}</p>
                        {/* <p>Steps: {this.props.recipeId.analyzedInstructions}</p> */}
                    </div>
                    : <h1>Loading ...</h1>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        recipeId: state.recipeDetail
    }
}
export default connect(mapStateToProps, { getDetail })(RecipeDetail);
