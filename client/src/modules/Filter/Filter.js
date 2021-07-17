import React from 'react'
import { useDispatch } from 'react-redux';
import {getOrder, getOrderByScore} from "../../store/actions/RecipesActions"

function Filter() {
    const dispatch = useDispatch();

    function handleOrder(e) {
        dispatch(getOrder(e.target.value));
    }

    function handleOrderByScore(e) {
		dispatch(getOrderByScore(e.target.value));
	}

    return (
        <div>
            <form>
				<p>Order by Score</p>
				<select onChange={handleOrderByScore}>
					<option value=''>Select</option>
					<option value='MINMAX'>+ to -</option>
					<option value='MAXMIN'>- to +</option>
				</select>
			</form>
            <form>
                <p>Order alphabetically</p>
                <select onChange={handleOrder}>
                    <option value=''>Select</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                </select>
            </form>
        </div>
    )
}

export default Filter
