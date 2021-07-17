import React from 'react'
import { useDispatch } from 'react-redux';
import {getOrder} from "../../store/actions/RecipesActions"

function Filter() {
    const dispatch = useDispatch();

    function handleOrder(e) {
        dispatch(getOrder(e.target.value));
    }
    return (
        <div>
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
