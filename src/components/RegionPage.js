import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const RegionPage = () => {
  const { region } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMealsByRegion = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`);
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.log("Internal Server Error");
      }
    };

    fetchMealsByRegion();
  }, [region]);

  return (
    <div className="container">
      <h1 className="my-4">Meals from {region}</h1>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-4 mb-4" key={meal.idMeal}>
            <Link to={`/description/${meal.idMeal}`} className="card">
              <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
              <div className="card-body">
                <h5 className="card-title text-center">{meal.strMeal}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionPage;
