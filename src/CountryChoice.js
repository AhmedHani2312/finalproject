import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { countries as countriesList } from 'countries-list';
import './CountryChoice.css'; // Make sure this path is correct

const CountryChoice = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const userId = state?.userId;
    const userEmail = state?.userEmail;
    const selectedFeatures = state?.selectedFeatures;

    if (!userId || !userEmail) {
        console.error('User information is missing');
        // Optionally redirect back or show an error message
        // navigate('/features-form'); // Uncomment to redirect back
        // return null; // Uncomment if redirecting
    }

    const handleCountryChange = (event) => {
        setSelectedCountryCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const codeMap = { gb: 'uk' }; // Mapping for country codes if necessary
        const convertedCode = codeMap[selectedCountryCode.toLowerCase()] || selectedCountryCode.toLowerCase();

        try {
            await axios.post('http://localhost:3000/user/submitCountryChoice', {
                user_id: userId,
                question_id: 7,
                uni_country: convertedCode,
            });
            navigate('/rating', { state: { userId, userEmail, country: convertedCode, selectedFeatures } });
        } catch (error) {
            console.error('Error submitting country choice:', error);
        }
    };

    return (
        <div className="country-choice-page-wrapper">
            <div className="country-choice-container">
                <h2>Rate Universities in your Country of Residence</h2>
                <form onSubmit={handleSubmit}>
                    <select onChange={handleCountryChange} value={selectedCountryCode} className="form-select">
                        <option value="" disabled>Select your country...</option>
                        {Object.entries(countriesList).map(([code, country]) => (
                            <option key={code} value={code}>{country.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary mt-3">Submit Choice</button>
                </form>
            </div>
        </div>
    );
};

export default CountryChoice;
