import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItems from './ListItems';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [result, setResult] = useState([]);
    const { query } = useParams();
    const navigate = useNavigate();

    const fetchdata = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            if(data.meals === null){
                navigate("/Noresult");
            }
            if (data.meals.length > 1) {
                setResult(data.meals); // Set result as an array of meals
            } else {
                setResult([data.meals[0]]); // Ensure result is always an array
            }
        } catch (error) {
            console.log("Error Occurred", error);
        }
    };

    useEffect(() => {
        fetchdata();
    }, [query]);

    return (
        <div className="container">
            <div className="row my-4">
                {result.length > 1 ? (
                    result.map((meal, index) => (
                        <div className="col-md-4 mt-4" key={meal.idMeal}>
                            <ListItems 
                                title={meal.strMeal} 
                                id={meal.idMeal} 
                                imageLink={meal.strMealThumb} 
                                description={meal.strInstructions ? meal.strInstructions.substring(0, 200) + "..." : ""} 
                            />
                        </div>
                    ))
                ) : (
                    result.length === 1 && (
                        <div className="col-md-4 mt-4" key={result[0].idMeal}>
                            <ListItems 
                                title={result[0].strMeal} 
                                id={result[0].idMeal} 
                                imageLink={result[0].strMealThumb} 
                                description={result[0].strInstructions ? result[0].strInstructions.substring(0, 200) + "..." : ""} 
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Search;
