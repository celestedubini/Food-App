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

    render() {console.log(this.props.recipeId);
        return (
            <div>
                {this.props.recipeId.length!==0 ?
                    <div>
                        <div>
                            <h2>
                                {this.props.recipeId.title}
                            </h2>
                        </div>
                        <img src={this.props.recipeId.image} alt={"img"} />
                        <p>Types of Diet: {typeof this.props.recipeId.diets[0] === "object"? this.props.recipeId.diets.map(diet => Object.values(diet)).join(", ") : this.props.recipeId.diets.map(diet => diet).join(", ")}</p>
                        <p>Summary: <div dangerouslySetInnerHTML={{__html: this.props.recipeId.summary}}></div></p>
                        <p>Score: {this.props.recipeId.spoonacularScore}</p>
                        <p>Health Score: {this.props.recipeId.healthScore}</p>
                        <p>Steps: <div dangerouslySetInnerHTML={{__html: this.props.recipeId.instructions}}></div></p>
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
