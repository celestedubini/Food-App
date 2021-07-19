import React from 'react'
import { NavLink } from 'react-router-dom'
import "./index.css";

function LandingPage() {
    return (
        <div className="landing">
            <div>
                <div className="intro">
                    <div className="henrymain">Henry</div>
                    <div className="foodmain">Food</div>
                    <div className="Sub">Let's eat!</div>
                </div>
                <NavLink to="/home">
                    <button className="activo">
                        Recipes
                    </button>
                </NavLink>
            </div>
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2019/01/food-photography-blogs-Pancake-pour.jpg" alt="Panqueques" className="panqueques" />
        </div>
    )
}

export default LandingPage
