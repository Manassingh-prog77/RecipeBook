import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();
        setData(data.meals);
      } catch (error) {
        console.log("Internal Server Error");
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    setSearch('');
  }, [location]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleRegionSelect = (region) => {
    navigate(`/region/${region}`);
  };

  const logOUt = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  }

  useEffect(()=>{
    setTimeout(()=>{
      if(!localStorage.getItem('token')){
        navigate('/Login');
      }
    },5000)
  },[navigate])

  return (
    <nav className="fixed-top navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RecipeBox</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipelist">Recipes List</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Region
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {Data.map((element) => (
                  <li key={element.strArea} onClick={() => handleRegionSelect(element.strArea)}>
                    <span className="dropdown-item" style={{ cursor: 'pointer' }}>{element.strArea}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/alphabet">A-Z Recipes</Link>
            </li>
          </ul>
          <form className="d-flex mx-auto" role="search" style={{ flex: 1, maxWidth: '600px' }}>
            <input className="form-control me-2 bg-light" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={Search} style={{ color: 'black' }} />
            <Link className="btn btn-primary" role="button" to={`/SearchKeyword/${Search}`}>Search</Link>
          </form>
          {!localStorage.getItem('token') ? (
            <div className="d-flex">
              <Link className="btn btn-outline-light me-2" to="/Login">Login</Link>
              <Link className="btn btn-outline-light" to="/SignUp">Sign Up</Link>
            </div>
          ) : (
            <div><button className="btn btn-outline-light me-2" onClick={logOUt}>Log Out</button></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
