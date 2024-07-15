import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-dark text-light py-4">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h5>RecipeBook</h5>
        <p>RecipeBox is a modern recipe application built using React.js. Discover a variety of delicious recipes, organize them into categories, and create your own personalized recipe collection. Whether you're a cooking enthusiast or just starting out, RecipeBox makes it easy to find your favorite recipes with family and friends.</p>
      </div>
      <div className="col-md-3">
        <h5>Socials</h5>
        <i className="fa-brands fa-facebook mx-1"></i>
        <i className="fa-brands fa-instagram mx-1"></i>
        <i className="fa-brands fa-x-twitter mx-1"></i>
      </div>
      <div className="col-md-3">
        <h5>Contact</h5>
        <p>Email: recipebook601@gmail.com<br />Phone: +123XXXXXXX</p>
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-md-6">
        <p>&copy; 2024 RecipeBook. All rights reserved.</p>
      </div>
      <div className="col-md-6 text-md-end">
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
          <li className="list-inline-item"><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer
