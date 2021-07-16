import React from 'react'
import { NavLink } from 'react-router-dom'
import "./index.css";

function LandingPage() {
    return (
        <div className="body">
            Vamo a comer
            <NavLink to="/home">A VER LAS RECETAS</NavLink>
        </div>
    )
}

export default LandingPage
