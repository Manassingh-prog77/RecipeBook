import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoResult from './Noresult';

const Alphabetic = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const fetchRecipesByLetter = async (letter) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.log("Internal Server Error");
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    fetchRecipesByLetter(letter);
  };

  return (
    <div className="container">
      <h1 className="my-4">Browse Recipes by Alphabet</h1>
      <div className="d-flex flex-wrap mb-4">
        {letters.map((letter) => (
          <button
            key={letter}
            className="btn btn-outline-primary m-1"
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {selectedLetter && (
        <>
          <h2 className="my-4">Recipes starting with "{selectedLetter}"</h2>
          <div className="row">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div className="col-md-4 mb-4" key={recipe.idMeal}>
                  <Link to={`/description/${recipe.idMeal}`} className="card">
                    <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.strMeal}</h5>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <NoResult message={`No recipes found starting with "${selectedLetter}".`} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Alphabetic;
