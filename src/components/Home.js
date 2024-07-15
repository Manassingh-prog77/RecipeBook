import React, { useEffect, useState } from "react";
import imagei from "./Designer.jpeg";
import ListItems from "./ListItems";

const Home = () => {
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
      let response = await fetch(url);
      let data = await response.json();
      return data.meals[0]; // Return a single meal object
    } catch (error) {
      console.log('Internal Error');
      return null;
    }
  };

  const fetchMultipleData = async (count) => {
    const newData = [];
    for (let i = 0; i < count; i++) {
      let meal = await fetchData();
      if (meal) {
        newData.push(meal);
      }
    }
    setData(newData);
  };

  useEffect(() => {
    fetchMultipleData(6); // Fetch 6 random recipes initially
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <div className="card d-flex my-3" style={{ border: "none" }}>
              <img
                src={imagei}
                className="card-img-top mx-4"
                style={{ height: "600px", width: "600px", borderRadius: "4%" }}
                alt="Designer Image"
              />
            </div>
          </div>
          <div className="col-6 my-5">
            <h2 className="text-center my-4">Discover, Cook, Share</h2>
            <div className="text-center my-5">
              "Welcome to RecipeBox, your ultimate culinary companion. Explore a
              world of delightful recipes, from comforting classics to
              innovative dishes. Whether you're a seasoned chef or just starting
              your culinary journey, RecipeBox is here to inspire you. Find
              recipes that suit your taste, create shopping lists, and share
              your cooking adventures with friends and family. Get ready to
              embark on a flavorful experience!"
            </div>
          </div>
        </div>
        <div className="boxes">
          <h2 className="text-center text-decoration-underline my-2">
            Let's Explore Some Famous Recipes
          </h2>
          <div className="container">
            <div className="row my-4">
              {Data.map((meal,index) => (
                <div key={index} className="col-md-4 mt-4">
                  <ListItems key={meal.idMeal} id={meal.idMeal} title={meal.strMeal} imageLink={meal.strMealThumb} description={meal.strInstructions? meal.strInstructions.substring(0, 200) + "...": ""}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
