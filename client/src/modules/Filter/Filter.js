import React from 'react'
import { useDispatch } from 'react-redux';
import {getOrder, getOrderByScore} from "../../store/actions/RecipesActions"
import "./Filter.css"

function Filter() {
    const dispatch = useDispatch();

    function handleOrder(e) {
        dispatch(getOrder(e.target.value));
    }

    function handleOrderByScore(e) {
		dispatch(getOrderByScore(e.target.value));
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
        </div>
    )
}

export default Filter
