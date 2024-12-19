// src/LoginForm.js
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const LoginForm = () => {
  // State for form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
 const Location = useLocation();
 const Data = Location.state;
 const navigate = useNavigate()
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!loginData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!loginData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", loginData);

      // Add your API call logic here for login
      setLoginData({ email: "", password: "" });
      setErrors({});
    }
    if (loginData.email ===Data.email && loginData.password === Data.password)
        navigate('/Dashboard');
    else{
        alert("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={loginData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
