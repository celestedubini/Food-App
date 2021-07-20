import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOrder, getOrderByScore, filterByDiet, getTypes } from "../../store/actions/RecipesActions"
import "./Filter.css"

function Filter(props) {
    function getTypesFunction() {
        props.getTypes()
    }
    useEffect(() => {
        getTypesFunction()
    }, [])

    const dispatch = useDispatch();


    const [filterDiets, setFilterDiets] = useState('');

    function handleOrder(e) {
        dispatch(getOrder(e.target.value));
    }

    function handleOrderByScore(e) {
        dispatch(getOrderByScore(e.target.value));
    }

    function handleFilter(e) {
        setFilterDiets(e.target.value)
        dispatch(filterByDiet(e.target.value))
    }

    return (
        <div className="filter">
            <form>
                <p>Order by Score</p>
                <select onChange={handleOrderByScore}>
                    <option value=''>Select</option>
                    <option value='MAXMIN'>Higher</option>
                    <option value='MINMAX'>Lower</option>
                </select>
            </form>
            <form>
                <p>Order alphabetically</p>
                <select onChange={handleOrder}>
                    <option value=''>Select</option>
                    <option value='ASC'>Ascendant</option>
                    <option value='DESC'>Descendant</option>
                </select>
            </form>
            <form>
                <p>Filter by Type Diets</p>
                <select onChange={handleFilter}>
                <option>All</option>
                {props.diets.length !== 0 ? props.diets.map((e) => (
                    <option key={e.id} value={e.name} > {e.name} </option>
            )) : <option>Loading</option>}</select>
            </form>

            



        </div >
    )
}

const mapStateToProps = state => {
    return {
        diets: state.diets
    }
}


export default connect(mapStateToProps, { getTypes })(Filter)