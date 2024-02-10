// CountryChoice.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { countries as countriesList } from 'countries-list';
import './CountryChoice.css'; // Import your stylesheet

const CountryChoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState('');
  const userId = location.state?.userId; // Get userId from passed state
  const userEmail = location.state?.userEmail; // Get userEmail from passed state if needed

  const countryOptions = Object.values(countriesList).map((country) => ({
    code: country.iso2,
    name: country.name,
  }));

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Now you need to send this data to your server
    try {
      await axios.post('http://localhost:3000/user/submitCountryChoice', {
        user_id: userId,
        question_id: 7,
        uni_country: country
      });
      // Navigate to the next page after successful submission
      navigate('/rating', { state: { userId, userEmail } });
    } catch (error) {
      console.error('Error submitting country choice:', error);
    }
  };

  return (
    <div className="country-choice-container">
      <h2>Select a Country</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={handleCountryChange} value={country}>
          <option value="" disabled>Select a country...</option>
          {countryOptions.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {/* Add additional content or components for the Country Choice here */}
        <button type="submit">Next Page</button>
      </form>
    </div>
  );
};

export default CountryChoice;
