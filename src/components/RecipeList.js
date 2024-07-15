import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListItems from "./ListItems";

const RecipeList = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Track whether more data can be loaded
  const [page, setPage] = useState(1); // Track page number for pagination

  const fetchData = async () => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
      let response = await fetch(url);
      let result = await response.json();
      let newMeal = result.meals[0];

      if (newMeal) {
        setData((prevData) => [...prevData, newMeal]); // Append new meal to existing data
        setPage(page + 1); // Increment page number
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.log("Internal Error");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial meal when component mounts
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore} // Indicates whether more data can be loaded
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={<p>No more meals to load!</p>}
    >
    
     <div className="container">
        <div className="row my-4">
          {data.map((meal, index) => (
            <div className="col-md-4 mt-4" key={index}>
              <ListItems title={meal.strMeal} id={meal.idMeal} imageLink={meal.strMealThumb} description={meal.strInstructions? meal.strInstructions.substring(0, 200) + "...": ""}/>
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default RecipeList;
