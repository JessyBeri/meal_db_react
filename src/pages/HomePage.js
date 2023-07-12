import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

function HomePage() {
    const [meals, setMeals] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [rangeValue, setRangeValue] = useState(50);
    const [sortMethod, setSortMethod] = useState(true);

    const fetchMeals = () => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then((response) => setMeals(response.data.meals));
    };

    useEffect(fetchMeals, [searchValue]);

    return (
        <>
            <header>
                <div className="headerContainer">
                    <h1>Trouver votre recette</h1>
                    <input
                        type="text"
                        placeholder="Rechercher"
                        defaultValue={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className="rangePart">
                        <input
                            type="range"
                            defaultValue={rangeValue}
                            min="0"
                            max="100"
                            onChange={(e) => setRangeValue(e.target.value)}
                        />
                        <span>{rangeValue}</span>
                    </div>
                    <div className="sortPart">
                        <button
                            type="button"
                            onClick={() => {
                                setSortMethod(!sortMethod);
                            }}
                        >
                            {sortMethod ? "A à Z" : "Z à A"}
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div className="mainContainer">
                    {meals &&
                        meals
                            .slice(0, rangeValue)
                            .sort((meal1, meal2) => {
                                if (sortMethod) {
                                    return meal1.strMeal.toLowerCase().localeCompare(meal2.strMeal.toLowerCase());
                                } else {
                                    return meal2.strMeal.toLowerCase().localeCompare(meal1.strMeal.toLowerCase());
                                }
                            })
                            .map((meal, index) => {
                                return <Card meal={meal} key={index} />;
                            })}
                </div>
            </main>
        </>
    );
}

export default HomePage;
