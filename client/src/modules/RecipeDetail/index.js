import React from 'react'
//import { useEffect } from "react";
import { connect } from 'react-redux';
import { getDetail } from '../../store/actions/RecipesActions';
import "./index.css"
import { NavLink } from 'react-router-dom';

class RecipeDetail extends React.Component {


    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.recipeId.length !== 0 ?
                    <div className="detail">
                        <div>
                            <h2 className="nombre">
                                {this.props.recipeId.title}
                            </h2>
                        </div>
                        <img src={this.props.recipeId.image} alt={"img"} className="fotito"/>
                        <div className="texto">
                            <p>Types of Diet: {typeof this.props.recipeId.diets[0] === "object" ? this.props.recipeId.diets.map(diet => Object.values(diet)).join(", ") : this.props.recipeId.diets.map(diet => diet).join(", ")}</p>
                            <p>Summary: </p><div dangerouslySetInnerHTML={{ __html: this.props.recipeId.summary }}></div>
                            <p>Score: {this.props.recipeId.spoonacularScore}</p>
                            <p>Health Score: {this.props.recipeId.healthScore}</p>
                            <p>Steps: </p><div dangerouslySetInnerHTML={{ __html: this.props.recipeId.instructions? this.props.recipeId.instructions : "Not available"}}></div>
                        </div>
                    </div>
                    : <h1 className="Loading">Loading ...</h1>
                }
                 <NavLink to='/home'>
                    <button className="botonBackDetail">Back</button>
                </NavLink>
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
