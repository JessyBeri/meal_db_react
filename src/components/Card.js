import React from "react";

function Card({ meal }) {
    // console.log(meal.idMeal);
    return (
        <div className="card">
            <div className="imagePart">
                <img src={meal.strMealThumb} alt={meal.strTags} />
            </div>
            <div className="infoPart">
                <h2>{meal.strMeal}</h2>
                <p>Origin: {meal.strArea}</p>
                <p className="recipe">{meal.strInstructions}</p>
            </div>
        </div>
    );
}

export default Card;
