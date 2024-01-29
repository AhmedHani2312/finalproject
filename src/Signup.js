import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for additional styling
import axios from 'axios';

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

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Data to send to the server
    const dataToSend = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      gender: formData.gender,
      age_range: formData.ageRange,
      country: formData.country,
      email: formData.email,
      university_name: formData.university,
    };

    // Send a POST request to the backend
    axios.post('http://localhost:3000/user/signup', dataToSend)
      .then(response => {
        const userId = response.data.user.insertId;
        const userEmail = response.data.user.email;
        console.log('Signup successful', response);
        console.log('User ID', userId);
        navigate('/personality-form', {state:{userId: userId, userEmail: userEmail}}); 
      })
      .catch(error => {
        console.error('Signup failed', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Age Range:</label>
          <select name="ageRange" value={formData.ageRange} onChange={handleInputChange}>
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
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>University:</label>
          <input type="text" name="university" value={formData.university} onChange={handleInputChange} />
        </div>

        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;


