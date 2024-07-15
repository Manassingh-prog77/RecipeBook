// Description.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Description = () => {
  const [Data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showVideo, setShowVideo] = useState(false); // State to track whether to show video or alternative

  let { id } = useParams();
  if (!id) {
    id = 52772; // Default ID if not provided
  }

  const fetchdata = async () => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      let response = await fetch(url);
      let data = await response.json();
      setData(data.meals[0]);
      setIngredients(getIngredients(data.meals[0]));
      setShowVideo(!!data.meals[0].strYoutube); // Set showVideo based on presence of strYoutube
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [id]);

  const getIngredients = (mealData) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push({
          ingredient: ingredient,
          measure: measure
        });
      } else {
        break; // Exit loop if ingredient or measure is undefined
      }
    }
    return ingredients;
  };

  const renderVideoOrAlternative = () => {
    if (Data.strYoutube) {
      return (
        <div>
          <h2 id="video">Video</h2>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={Data.strYoutube.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2 id="alternative">Alternative</h2>
          <p>No video available. You can visit the Wikipedia page for more information.</p>
          {/* Replace with actual Wikipedia link or button */}
          <a href={`https://en.wikipedia.org/wiki/${Data.strMeal}`} target="_blank" rel="noopener noreferrer">Visit Wikipedia</a>
        </div>
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <img src={Data.strMealThumb} alt={Data.strMeal} className="img-fluid rounded mb-3" />
          <h1>{Data.strMeal}</h1>
          <p><strong>Category:</strong> {Data.strCategory}</p>
          <p><strong>Area:</strong> {Data.strArea}</p>
          <p><strong>Tags:</strong> {Data.strTags}</p>
        </div>
        <div className="col-md-8">
          <div className="container">
            <h2>Contents</h2>
            <ul className="nav flex-column">
              <li className="nav-item"><a className="nav-link" href="#instructions">Instructions</a></li>
              <li className="nav-item"><a className="nav-link" href="#ingredients">Ingredients</a></li>
              {showVideo && (
                <li className="nav-item"><a className="nav-link" href="#video">Video</a></li>
              )}
              {!showVideo && (
                <li className="nav-item"><a className="nav-link" href="#alternative">Alternative</a></li>
              )}
            </ul>
          </div>
          <div>
            <h2 id="instructions">Instructions</h2>
            <p>{Data.strInstructions}</p>
            <h2 id="ingredients">Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>{`${item.measure} ${item.ingredient}`}</li>
              ))}
            </ul>
            {renderVideoOrAlternative()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description; // Wrap Description with Authentication HOC
