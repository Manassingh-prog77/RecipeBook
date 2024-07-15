import React from "react";
import image from "./Designer.jpeg";
import {Link} from 'react-router-dom';

const ListItems = (props) => {
    const {id, title, imageLink, description} = props;
  return (
    <div className="card">
      <img src={!imageLink?image:imageLink} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description}
        </p>
        <Link className="btn btn-primary" to= {`/description/${id}`}>
          Let's Cook
        </Link>
      </div>
    </div>
  );
};

export default ListItems;
