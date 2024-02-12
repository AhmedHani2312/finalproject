import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { countries as countriesList } from 'countries-list';
import './CountryChoice.css';

const CountryChoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  const userId = location.state?.userId;
  const userEmail = location.state?.userEmail;

  const countryOptions = Object.entries(countriesList).map(([isoCode, country]) => ({
    code: isoCode,
    name: country.name,
  }));

  const handleCountryChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const lowercaseCountryCode = selectedCountryCode.toLowerCase(); // Convert to lowercase

    try {
      await axios.post('http://localhost:3000/user/submitCountryChoice', {
        user_id: userId,
        question_id: 7,
        uni_country: lowercaseCountryCode // Send the lowercase ISO code
      });
      navigate('/rating', { state: { userId, userEmail } });
    } catch (error) {
      console.error('Error submitting country choice:', error);
    }
  };

  return (
    <div className="country-choice-container">
      <h2>Select a Country for your Future University</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={handleCountryChange} value={selectedCountryCode}>
          <option value="" disabled>Select a Country...</option>
          {countryOptions.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button type="submit">Next Page</button>
      </form>
    </div>
  );
};

export default CountryChoice;
