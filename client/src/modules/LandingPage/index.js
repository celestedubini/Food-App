import React from 'react'
import { NavLink } from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            Vamo a comer
            <NavLink to="/home">A VER LAS RECETAS</NavLink>
        </div>
    )
}

export default LandingPage
