import React from 'react'
import { useState, useEffect } from "react";
import { BASE_URL, ALL_RECIPES } from "../../constants"
import { connect } from 'react-redux';
import { getRecipes } from '../../store/actions/RecipesActions';
import "./index.css";

const renderData = (recipes) => {
    return (<div>
        {recipes.map((recipe) => {
            return <div key={recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt="Foto de la receta"></img>
                <p>Tipos de dieta: {recipe.diets? recipe.diets : recipe.typeDiets.map(diet => diet.name)}</p>
            </div>
        })}</div>)}

    function PaginationComponent({ recipes, getRecipes }) {
        function getRecipesFunction() {
            getRecipes()
        }
        useEffect(() => {
            getRecipesFunction()
        }, [])

        const [currentPage, setcurrentPage] = useState(1);
        const [itemsPerPage, setitemsPerPage] = useState(9);

        const [pageNumberLimit] = useState(5);
        const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
        const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

        const handleClick = (event) => {
            setcurrentPage(Number(event.target.id));
        };

        const pages = [];
        for (let i = 1; i <= Math.ceil(recipes.length / itemsPerPage); i++) {
            pages.push(i);
        }

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

        const renderPageNumbers = pages.map((number) => {
            if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                return (
                    <li
                        key={number}
                        id={number}
                        onClick={handleClick}
                        className={currentPage === number ? "active" : null}
                    >
                        {number}
                    </li>
                );
            } else {
                return null;
            }
        });

        const handleNextbtn = () => {
            setcurrentPage(currentPage + 1);

            if (currentPage + 1 > maxPageNumberLimit) {
                setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            }
        };

        const handlePrevbtn = () => {
            setcurrentPage(currentPage - 1);

            if ((currentPage - 1) % pageNumberLimit === 0) {
                setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
        };

        let pageIncrementBtn = null;
        if (pages.length > maxPageNumberLimit) {
            pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
        }

        let pageDecrementBtn = null;
        if (minPageNumberLimit >= 1) {
            pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
        }

        return (
            <>
                <h1>Henry Food</h1> <br />
                {renderData(currentItems)}
                <ul className="pageNumbers">
                    <li>
                        <button
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0] ? true : false}
                        >
                            Prev
                        </button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}

                    <li>
                        <button
                            onClick={handleNextbtn}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </>
        );
    }

    const mapStateToProps = state => {
        return {
            recipes: state.recipes
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            getRecipes: recipes => {
                dispatch(getRecipes(recipes))
            }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent)


