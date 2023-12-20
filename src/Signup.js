import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for additional styling

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    ageRange: '',
    country: '',
    email: '',
    university: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    console.log('User signed up!', formData);
    // You can handle form submission logic here
    // For now, let's navigate to the next page
    navigate('/personality-form');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Age Range:</label>
          <select name="ageRange" onChange={handleInputChange}>
            <option value="">Select Age Range</option>
            <option value="below18">Below 18</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="44-54">44-54</option>
            <option value="over55">Over 55</option>
          </select>
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input type="text" name="country" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>University:</label>
          <input type="text" name="university" onChange={handleInputChange} />
        </div>

        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;