// CountryChoice.js
import React from 'react';
import { Link } from 'react-router-dom';
import { countries as countriesList } from 'countries-list';
import './CountryChoice.css'; // Import your stylesheet

const CountryChoice = () => {
  const countryOptions = Object.values(countriesList).map((country) => ({
    code: country.iso2,
    name: country.name,
  }));

  return (
    <div className="country-choice-container">
      <h2>Select a Country</h2>
      <select>
        <option value="" disabled selected>Select a country...</option>
        {countryOptions.map((country, index) => (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      {/* Add additional content or components for the Country Choice here */}
      <Link to="/rating">
        <button>Next Page</button>
      </Link>
    </div>
  );
};

export default CountryChoice;
