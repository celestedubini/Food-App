import React from 'react'
import { NavLink } from 'react-router-dom'
import "./index.css";

function LandingPage() {
    return (
        <div className="body">
            <div className="Henry">Henry</div>
            <div className="Food">Food</div>
            <div className="Sub">Vamo a comer</div>
            <NavLink to="/home">
                <button className="activo">
                    <div className="Recetario">Recetario</div>
                </button>
            </NavLink>
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2019/01/food-photography-blogs-Pancake-pour.jpg" alt="Panqueques" className="Foto"/>
        </div>
    )
}

export default LandingPage
