import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Conditionally save the token based on the checkbox state
      if (rememberMe) {
        localStorage.setItem("token", json.authtoken);
      }
      navigate("/");
      // props.showalert("Logged In Successfully", "success")
    } else {
      sessionStorage.setItem("token", json.authtoken);
      navigate("/");
      // props.showalert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#fff" }}
      >
        <div
          className="card p-4"
          style={{
            width: "400px",
            borderRadius: "10px",
            backgroundColor: "#000",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#f8f9fa" }}>
            Sign Up
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" style={{ color: "#f8f9fa" }}>
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                onChange={onChange}
                value={credentials.username}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email" style={{ color: "#f8f9fa" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={onChange}
                value={credentials.email}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password" style={{ color: "#f8f9fa" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={onChange}
                value={credentials.password}
              />
            </div>
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                onChange={handleCheckboxChange}
                checked={rememberMe}
              />
              <label
                className="form-check-label"
                htmlFor="rememberMe"
                style={{ color: "#f8f9fa" }}
              >
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
