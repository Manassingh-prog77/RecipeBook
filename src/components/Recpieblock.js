import React from "react";
import Recipeimage from './Designer.jpeg'

const Recpieblock = () => {
    let title = "Pizza";
    let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, reprehenderit at iure magni corporis ab, praesentium provident perspiciatis blanditiis voluptatum distinctio consequuntur adipisci omnis facilis numquam odio saepe repellendus recusandae"
/*!imageUrl?Recipeimage:imageUrl*/
  return (
    <>
    <div className="my-3">
        <div className="card">
          <div style={{display: 'flex',justifyContent: 'flex-end',position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-danger">{/*{source}*/}</span>
          </div>
          <img src= {Recipeimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href='#' target="_blank" className="btn btn-sm btn-dark">Get Recipe</a>
          </div>
        </div>
      </div>
      </>
  );
};

export default Recpieblock;
